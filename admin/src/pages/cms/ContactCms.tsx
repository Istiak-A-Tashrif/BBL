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
  hero: { eyebrow: "Contact", title: "Talk to BBL about projects, partnerships, and property needs", description: "Reach the Biswas Builders Limited team for buyer support, landowner partnership, project inquiry, or general communication.", image: "/bbl/sister-banner.jpg" },
  cards: [
    { title: "Phone", value: "+88 01678 086168", description: "Call for sales, project inquiry, or customer care." },
    { title: "Email", value: "info@bblbd.com", description: "Send documents, questions, or partnership details." },
    { title: "Office", value: "New Market, Dhaka", description: "Visit by appointment for project and landowner discussions." },
  ],
  form: { eyebrow: "Send Message", title: "Tell us what you are looking for", description: "This frontend form is ready for UI testing. We can connect it to backend storage or email next.", submitText: "Submit Inquiry" },
  visit: { eyebrow: "Visit", title: "Find Biswas Builders Limited", address: "New Market City Complex, 44/1 Rahim Square, New Market, Dhaka-1205", mapUrl: "https://share.google/mozevMwyHJPMdAXNA" },
};

const isObject = (value: unknown): value is Record<string, any> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) return (Array.isArray(override) && override.length ? override : base) as T;
  if (!isObject(base)) return (override ?? base) as T;
  const merged: Record<string, any> = { ...base };
  Object.keys(base).forEach((key) => { merged[key] = deepMerge((base as Record<string, any>)[key], override?.[key]); });
  return merged as T;
}

export default function ContactCms() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageStore();
  const { data: page, isLoading, refetch } = useQuery({
    queryKey: ["cms-page-contact"],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cmsFindWhere, { where: { slug: "contact-us" } });
      const page = response.data?.[0] as CmsPage | undefined;
      return page ? { ...page, content: deepMerge(defaultContent, page.content) } : undefined;
    },
  });
  useEffect(() => { form.setFieldsValue(page?.content || defaultContent); }, [form, page]);
  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, any>) => {
      const payload = { slug: "contact-us", title: "Contact Us", status: "published", published_at: new Date().toISOString(), content: deepMerge(defaultContent, { ...(page?.content || {}), ...content }), metadata: { description: "Contact Biswas Builders Limited" } };
      if (page?.id) return axiosInstance.patch(`/crud/${page.id}?model=cmsPage`, payload);
      return axiosInstance.post(endpoints.cmsPages, payload);
    },
    onSuccess: async () => { await revalidateCms("contact-us"); messageApi?.success("Contact page saved"); await refetch(); },
    onError: (error: any) => messageApi?.error(error?.response?.data?.message || "Could not save contact page"),
  });
  if (isLoading) return <div className="flex h-[calc(100vh-112px)] items-center justify-center"><Spin /></div>;
  return (
    <>
      {setPageTitle("Contact CMS")}<PageTitle title="Contact CMS" breadcrumbs={[]} />
      <Form form={form} layout="vertical" initialValues={defaultContent} onFinish={(values) => saveMutation.mutate(values)}>
        <Tabs items={[
          { key: "hero", label: "Hero", forceRender: true, children: <Card><Row gutter={16}><Col md={12} xs={24}><Form.Item name={["hero", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col><Col md={12} xs={24}><Form.Item name={["hero", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col><Col xs={24}><Form.Item name={["hero", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item></Col><Col xs={24}><ImageField name={["hero", "image"]} label="Hero Image" /></Col></Row></Card> },
          { key: "cards", label: "Contact Cards", forceRender: true, children: <Form.List name="cards">{(fields, { add, remove }) => <><Row gutter={16}>{fields.map((field, index) => <Col md={8} xs={24} key={field.key}><Card title={`Card ${index + 1}`} extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}><Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "value"]} label="Value" rules={textRules}><Input /></Form.Item><Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item></Card></Col>)}</Row><Button icon={<PlusOutlined />} onClick={() => add({ title: "", value: "", description: "" })}>Add Card</Button></>}</Form.List> },
          { key: "form", label: "Form Copy", forceRender: true, children: <Card><Form.Item name={["form", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item><Form.Item name={["form", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item><Form.Item name={["form", "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item><Form.Item name={["form", "submitText"]} label="Submit Text" rules={textRules}><Input /></Form.Item></Card> },
          { key: "visit", label: "Visit", forceRender: true, children: <Card><Form.Item name={["visit", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item><Form.Item name={["visit", "title"]} label="Title" rules={textRules}><Input /></Form.Item><Form.Item name={["visit", "address"]} label="Address" rules={textRules}><Input.TextArea rows={3} /></Form.Item><Form.Item name={["visit", "mapUrl"]} label="Google Maps Link or Embed URL" rules={textRules} extra="Embed URLs are used directly in the iframe. Regular Google Maps links keep the CMS value saved, and the iframe uses the address above."><Input /></Form.Item></Card> },
        ]} />
        <div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white py-4 dark:bg-black"><Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveMutation.isPending}>Save Contact Page</Button></div>
      </Form>
    </>
  );
}
