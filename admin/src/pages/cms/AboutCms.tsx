import { DeleteOutlined, InboxOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Form, Input, Row, Spin, Tabs, Upload } from "antd";
import type { UploadProps } from "antd";
import { useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import { revalidateCms } from "../../api/nextCache";
import PageTitle from "../../components/PageTitle";
import { useMessageStore } from "../../stores/messageStore";
import { setPageTitle } from "../../utils/setPageTitle";

type CmsPage = {
  id: number;
  slug: string;
  title: string;
  status: string;
  content: Record<string, any>;
};

const apiOrigin = String(import.meta.env.VITE_API_BASE_URL || "")
  .replace(/\/api\/v1\/?$/, "")
  .replace(/\/+$/, "");
const frontendOrigin = String(import.meta.env.VITE_FRONTEND_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

const assetUrl = (path?: string) => {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith("/uploads/")) return `${apiOrigin}${path}`;
  return `${frontendOrigin}${path}`;
};

function ImageField({ name, label }: { name: (string | number)[]; label: string }) {
  const form = Form.useFormInstance();
  const value = Form.useWatch(name, form);

  const uploadProps: UploadProps = {
    name: "file",
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const body = new FormData();
        body.append("file", file as File);
        const response = await axiosInstance.post(endpoints.uploadImage, body);
        form.setFields([{ name, value: response.data.path, errors: [] }]);
        onSuccess?.(response.data, file as File);
      } catch (error) {
        onError?.(error as Error);
      }
    },
  };

  return (
    <Form.Item label={label}>
      <Form.Item name={name} noStyle>
        <Input type="hidden" />
      </Form.Item>
      <Upload.Dragger {...uploadProps} accept="image/*">
        {value ? (
          <div className="flex flex-col items-center gap-2">
            <img src={assetUrl(value)} alt={label} className="max-h-36 max-w-full rounded border object-cover" />
            <span className="text-xs text-gray-500">Click or drop to replace</span>
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Click or drop image here</p>
          </>
        )}
      </Upload.Dragger>
    </Form.Item>
  );
}

const textRules = [{ required: true, message: "Required" }];

const defaultAboutContent = {
  hero: {
    eyebrow: "About BBL",
    title: "Built on quality, accountability, and long-term trust",
    description:
      "Biswas Builders Limited is a Bangladeshi real estate and construction company serving homeowners, landowners, and commercial partners since 1994.",
    image: "/bbl/block-about.png",
  },
  stats: [
    { value: "1994", label: "Established" },
    { value: "800+", label: "Team and workers" },
    { value: "4+", label: "Highlighted projects" },
  ],
  intro: {
    eyebrow: "About BBL",
    title: "We build residential, commercial, and infrastructure projects with quality and accountability",
    description:
      "Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy.",
    quote: "Build with a trusted name since 1994.",
  },
  features: [
    {
      title: "Quality materials",
      description:
        "Our teams support clients before, during, and after handover with clear information, documentation, and responsive service.",
    },
    {
      title: "Engineering strength",
      description:
        "Our service approach is built on integrity, professionalism, timeliness, confidentiality, credibility, honesty, and respect.",
    },
    {
      title: "Client-first service",
      description:
        "With about 300 regular employees and more than 500 daily workers, BBL is equipped for complex real estate and construction work.",
    },
  ],
  journey: {
    eyebrow: "Our Journey",
    title: "A steady path from apartment construction to landmark delivery",
    description:
      "The company's growth has stayed close to the same core promise: practical planning, reliable construction, and responsive service after handover.",
    items: [
      { year: "1994", title: "Started with a clear promise", description: "BBL began with apartment construction and a practical belief in accountable delivery." },
      { year: "2000s", title: "Expanded project capability", description: "The company grew across residential, commercial, and civil construction work." },
      { year: "Today", title: "Focused on lasting value", description: "BBL now serves buyers, landowners, and partners through planning, execution, and customer care." },
    ],
  },
  values: {
    eyebrow: "Operating Principles",
    title: "The standards behind every BBL project",
    description:
      "The company runs on clear communication, documented decisions, professional coordination, and a long-term view of the spaces it creates.",
    images: ["/bbl/project-1.jpg", "/bbl/gallery-1.jpg", "/bbl/project-3.jpg", "/bbl/value.jpg"],
  },
};

const isObject = (value: unknown): value is Record<string, any> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) return (Array.isArray(override) && override.length ? override : base) as T;
  if (!isObject(base)) return (override ?? base) as T;
  const merged: Record<string, any> = { ...base };
  Object.keys(base).forEach((key) => {
    merged[key] = deepMerge((base as Record<string, any>)[key], override?.[key]);
  });
  return merged as T;
}

export default function AboutCms() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageStore();

  const { data: aboutPage, isLoading, refetch } = useQuery({
    queryKey: ["cms-page-about"],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cmsFindWhere, {
        where: { slug: "about-us" },
      });
      const page = response.data?.[0] as CmsPage | undefined;
      return page ? { ...page, content: deepMerge(defaultAboutContent, page.content) } : undefined;
    },
  });

  useEffect(() => {
    form.setFieldsValue(aboutPage?.content || defaultAboutContent);
  }, [form, aboutPage]);

  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, any>) => {
      const payload = {
        slug: "about-us",
        title: "About Us",
        status: "published",
        published_at: new Date().toISOString(),
        content: deepMerge(defaultAboutContent, { ...(aboutPage?.content || {}), ...content }),
        metadata: { description: "About Biswas Builders Limited" },
      };

      if (aboutPage?.id) return axiosInstance.patch(`/crud/${aboutPage.id}?model=cmsPage`, payload);
      return axiosInstance.post(endpoints.cmsPages, payload);
    },
    onSuccess: async () => {
      await revalidateCms("about-us");
      messageApi?.success("About page saved");
      await refetch();
    },
    onError: (error: any) => {
      messageApi?.error(error?.response?.data?.message || "Could not save about page");
    },
  });

  if (isLoading) {
    return <div className="flex h-[calc(100vh-112px)] items-center justify-center"><Spin /></div>;
  }

  return (
    <>
      {setPageTitle("About CMS")}
      <PageTitle title="About CMS" breadcrumbs={[]} />
      <Form form={form} layout="vertical" initialValues={defaultAboutContent} onFinish={(values) => saveMutation.mutate(values)}>
        <Tabs
          items={[
            {
              key: "hero",
              label: "Hero",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col md={12} xs={24}><Form.Item name={["hero", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["hero", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col>
                    <Col xs={24}><Form.Item name={["hero", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item></Col>
                    <Col xs={24}><ImageField name={["hero", "image"]} label="Hero Image" /></Col>
                  </Row>
                </Card>
              ),
            },
            {
              key: "stats",
              label: "Stats",
              forceRender: true,
              children: (
                <Form.List name="stats">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={16}>
                        {fields.map((field, index) => (
                          <Col md={8} xs={24} key={field.key}>
                            <Card title={`Stat ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}>
                              <Form.Item name={[field.name, "value"]} label="Value" rules={textRules}><Input /></Form.Item>
                              <Form.Item name={[field.name, "label"]} label="Label" rules={textRules}><Input /></Form.Item>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <Button icon={<PlusOutlined />} onClick={() => add({ value: "", label: "" })}>Add Stat</Button>
                    </>
                  )}
                </Form.List>
              ),
            },
            {
              key: "intro",
              label: "Intro",
              forceRender: true,
              children: (
                <Card>
                  <Form.Item name={["intro", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item>
                  <Form.Item name={["intro", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item>
                  <Form.Item name={["intro", "description"]} label="Description" rules={textRules}><Input.TextArea rows={5} /></Form.Item>
                  <Form.Item name={["intro", "quote"]} label="Quote" rules={textRules}><Input /></Form.Item>
                </Card>
              ),
            },
            {
              key: "features",
              label: "Features",
              forceRender: true,
              children: (
                <Form.List name="features">
                  {(fields, { add, remove }) => (
                    <>
                      <Row gutter={16}>
                        {fields.map((field, index) => (
                          <Col md={8} xs={24} key={field.key}>
                            <Card title={`Feature ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}>
                              <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                              <Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={4} /></Form.Item>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <Button icon={<PlusOutlined />} onClick={() => add({ title: "", description: "" })}>Add Feature</Button>
                    </>
                  )}
                </Form.List>
              ),
            },
            {
              key: "journey",
              label: "Journey",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Form.Item name={["journey", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item>
                    <Form.Item name={["journey", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item>
                    <Form.Item name={["journey", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item>
                  </Card>
                  <Form.List name={["journey", "items"]}>
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={8} xs={24} key={field.key}>
                              <Card title={`Milestone ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}>
                                <Form.Item name={[field.name, "year"]} label="Year" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ year: "", title: "", description: "" })}>Add Milestone</Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: "values",
              label: "Values",
              forceRender: true,
              children: (
                <Card>
                  <Form.Item name={["values", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item>
                  <Form.Item name={["values", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item>
                  <Form.Item name={["values", "description"]} label="Description" rules={textRules}><Input.TextArea rows={4} /></Form.Item>
                  <Row gutter={16}>
                    {[0, 1, 2, 3].map((index) => (
                      <Col md={6} xs={24} key={index}><ImageField name={["values", "images", index]} label={`Image ${index + 1}`} /></Col>
                    ))}
                  </Row>
                </Card>
              ),
            },
          ]}
        />
        <div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white py-4 dark:bg-black">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveMutation.isPending}>
            Save About Page
          </Button>
        </div>
      </Form>
    </>
  );
}
