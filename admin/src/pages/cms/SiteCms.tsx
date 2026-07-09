import { InboxOutlined, SaveOutlined } from "@ant-design/icons";
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

const defaultSiteContent = {
  site: {
    name: "Biswas Builders Limited",
    logoDark: "/bbl/logo-blue.svg",
    phone: "+88 01678 086168",
    navHomeLabel: "Home",
    navAboutLabel: "About",
    navProjectsLabel: "Projects",
    navContactLabel: "Contact",
  },
  footer: {
    eyebrow: "Contact",
    title: "Let's work together",
    description: "Biswas Builders Limited is a Bangladeshi real estate and construction company established in 1994.",
    buttonText: "Contact BBL",
    background: "/bbl/sister-banner.jpg",
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

export default function SiteCms() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageStore();

  const { data: sitePage, isLoading, refetch } = useQuery({
    queryKey: ["cms-page-site-settings"],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cmsFindWhere, {
        where: { slug: "site-settings" },
      });
      const page = response.data?.[0] as CmsPage | undefined;
      return page ? { ...page, content: deepMerge(defaultSiteContent, page.content) } : undefined;
    },
  });

  useEffect(() => {
    form.setFieldsValue(sitePage?.content || defaultSiteContent);
  }, [form, sitePage]);

  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, any>) => {
      const payload = {
        slug: "site-settings",
        title: "Site Settings",
        status: "published",
        published_at: new Date().toISOString(),
        content: deepMerge(defaultSiteContent, { ...(sitePage?.content || {}), ...content }),
        metadata: { description: "Shared website navigation and footer" },
      };

      if (sitePage?.id) return axiosInstance.patch(`/crud/${sitePage.id}?model=cmsPage`, payload);
      return axiosInstance.post(endpoints.cmsPages, payload);
    },
    onSuccess: async () => {
      await revalidateCms("site-settings");
      messageApi?.success("Site settings saved");
      await refetch();
    },
    onError: (error: any) => {
      messageApi?.error(error?.response?.data?.message || "Could not save site settings");
    },
  });

  if (isLoading) {
    return <div className="flex h-[calc(100vh-112px)] items-center justify-center"><Spin /></div>;
  }

  return (
    <>
      {setPageTitle("Site CMS")}
      <PageTitle title="Site CMS" breadcrumbs={[]} />
      <Form form={form} layout="vertical" initialValues={defaultSiteContent} onFinish={(values) => saveMutation.mutate(values)}>
        <Tabs
          items={[
            {
              key: "site",
              label: "Navigation",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col md={12} xs={24}><Form.Item name={["site", "name"]} label="Site Name" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["site", "phone"]} label="Phone" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["site", "navHomeLabel"]} label="Home Nav Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["site", "navAboutLabel"]} label="About Nav Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["site", "navProjectsLabel"]} label="Projects Nav Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["site", "navContactLabel"]} label="Contact Nav Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><ImageField name={["site", "logoDark"]} label="Logo" /></Col>
                  </Row>
                </Card>
              ),
            },
            {
              key: "footer",
              label: "Footer",
              forceRender: true,
              children: (
                <Card>
                  <Form.Item name={["footer", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item>
                  <Form.Item name={["footer", "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                  <Form.Item name={["footer", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item>
                  <Form.Item name={["footer", "buttonText"]} label="Button Text" rules={textRules}><Input /></Form.Item>
                  <ImageField name={["footer", "background"]} label="Footer Background" />
                </Card>
              ),
            },
          ]}
        />
        <div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white py-4 dark:bg-black">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveMutation.isPending}>
            Save Site Settings
          </Button>
        </div>
      </Form>
    </>
  );
}
