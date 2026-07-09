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

type CmsPage = { id: number; content: Record<string, any> };
const textRules = [{ required: true, message: "Required" }];
const apiOrigin = String(import.meta.env.VITE_API_BASE_URL || "").replace(/\/api\/v1\/?$/, "").replace(/\/+$/, "");
const frontendOrigin = String(import.meta.env.VITE_FRONTEND_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const assetUrl = (path?: string) => !path ? "" : /^https?:\/\//.test(path) ? path : path.startsWith("/uploads/") ? `${apiOrigin}${path}` : `${frontendOrigin}${path}`;

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
      <Form.Item name={name} noStyle><Input type="hidden" /></Form.Item>
      <Upload.Dragger {...uploadProps} accept="image/*">
        {value ? <div className="flex flex-col items-center gap-2"><img src={assetUrl(value)} alt={label} className="max-h-36 max-w-full rounded border object-cover" /><span className="text-xs text-gray-500">Click or drop to replace</span></div> : <><p className="ant-upload-drag-icon"><InboxOutlined /></p><p className="ant-upload-text">Click or drop image here</p></>}
      </Upload.Dragger>
    </Form.Item>
  );
}

const defaultContent = {
  hero: { eyebrow: "Projects", title: "Spaces planned for value, utility, and long-term trust", description: "Explore selected residential and commercial work from Biswas Builders Limited.", image: "/bbl/project-banner.jpg" },
  intro: { eyebrow: "Project Portfolio", title: "A focused collection of BBL developments", description: "BBL works across residential apartments, commercial buildings, landowner partnerships, and construction delivery with a consistent focus on planning, quality, and handover accountability." },
  filters: ["All", "Residential", "Commercial", "Ongoing", "Completed"],
  projects: [
    { title: "Biswas Tower", location: "New Market, Dhaka", year: "2024", type: "Commercial", status: "Ongoing", image: "/bbl/project-1.jpg" },
    { title: "Biswas Credence", location: "Dhaka", year: "2023", type: "Residential", status: "Completed", image: "/bbl/project-2.jpg" },
    { title: "Biswas Moyeen Tower", location: "Dhaka", year: "2022", type: "Commercial", status: "Completed", image: "/bbl/project-3.jpg" },
    { title: "Saiham Future Complex", location: "Dhaka", year: "2021", type: "Commercial", status: "Completed", image: "/bbl/project-banner.jpg" },
  ],
  process: { eyebrow: "Delivery Method", title: "From land and design to construction and handover", items: [
    { title: "Planning", description: "Project feasibility, location value, utility, and approvals are coordinated before execution." },
    { title: "Construction", description: "Engineering, procurement, site supervision, and quality checks keep each project accountable." },
    { title: "Handover", description: "Sales, documentation, customer care, and after-sales support continue through completion." },
  ] },
};

const isObject = (value: unknown): value is Record<string, any> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) return (Array.isArray(override) && override.length ? override : base) as T;
  if (!isObject(base)) return (override ?? base) as T;
  const merged: Record<string, any> = { ...base };
  Object.keys(base).forEach((key) => { merged[key] = deepMerge((base as Record<string, any>)[key], override?.[key]); });
  return merged as T;
}

export default function ProjectsCms() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageStore();
  const { data: page, isLoading, refetch } = useQuery({
    queryKey: ["cms-page-projects"],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cmsFindWhere, { where: { slug: "projects" } });
      const page = response.data?.[0] as CmsPage | undefined;
      return page ? { ...page, content: deepMerge(defaultContent, page.content) } : undefined;
    },
  });
  useEffect(() => { form.setFieldsValue(page?.content || defaultContent); }, [form, page]);
  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, any>) => {
      const payload = { slug: "projects", title: "Projects", status: "published", published_at: new Date().toISOString(), content: deepMerge(defaultContent, { ...(page?.content || {}), ...content }), metadata: { description: "Biswas Builders Limited projects" } };
      if (page?.id) return axiosInstance.patch(`/crud/${page.id}?model=cmsPage`, payload);
      return axiosInstance.post(endpoints.cmsPages, payload);
    },
    onSuccess: async () => { await revalidateCms("projects"); messageApi?.success("Projects page saved"); await refetch(); },
    onError: (error: any) => messageApi?.error(error?.response?.data?.message || "Could not save projects page"),
  });
  if (isLoading) return <div className="flex h-[calc(100vh-112px)] items-center justify-center"><Spin /></div>;
  return (
    <>
      {setPageTitle("Projects CMS")}<PageTitle title="Projects CMS" breadcrumbs={[]} />
      <Form form={form} layout="vertical" initialValues={defaultContent} onFinish={(values) => saveMutation.mutate(values)}>
        <Tabs items={[
          { key: "hero", label: "Hero", forceRender: true, children: <Card><Row gutter={16}><Col md={12} xs={24}><Form.Item name={["hero", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col><Col md={12} xs={24}><Form.Item name={["hero", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col><Col xs={24}><Form.Item name={["hero", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item></Col><Col xs={24}><ImageField name={["hero", "image"]} label="Hero Image" /></Col></Row></Card> },
          { key: "intro", label: "Intro", forceRender: true, children: <Card><Form.Item name={["intro", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item><Form.Item name={["intro", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item><Form.Item name={["intro", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item><Form.Item name="filtersText" label="Filters (comma separated)" getValueProps={() => ({ value: (form.getFieldValue("filters") || []).join(", ") })}><Input onChange={(event) => form.setFieldValue("filters", event.target.value.split(",").map((item) => item.trim()).filter(Boolean))} /></Form.Item></Card> },
          { key: "projects", label: "Projects", forceRender: true, children: <Form.List name="projects">{(fields, { add, remove }) => <><Row gutter={16}>{fields.map((field, index) => <Col md={12} xs={24} key={field.key}><Card className="mb-4" title={`Project ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}><Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "location"]} label="Location" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "year"]} label="Year" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "type"]} label="Type" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "status"]} label="Status" rules={textRules}><Input /></Form.Item><ImageField name={["projects", field.name, "image"]} label="Image" /></Card></Col>)}</Row><Button icon={<PlusOutlined />} onClick={() => add({ title: "", location: "", year: "", type: "", status: "", image: "" })}>Add Project</Button></>}</Form.List> },
          { key: "process", label: "Process", forceRender: true, children: <><Card className="mb-4"><Form.Item name={["process", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item><Form.Item name={["process", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Card><Form.List name={["process", "items"]}>{(fields, { add, remove }) => <><Row gutter={16}>{fields.map((field, index) => <Col md={8} xs={24} key={field.key}><Card title={`Step ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}><Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item></Card></Col>)}</Row><Button icon={<PlusOutlined />} onClick={() => add({ title: "", description: "" })}>Add Step</Button></>}</Form.List></> },
        ]} />
        <div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white py-4 dark:bg-black"><Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveMutation.isPending}>Save Projects Page</Button></div>
      </Form>
    </>
  );
}
