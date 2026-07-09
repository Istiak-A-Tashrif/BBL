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
const frontendOrigin = String(import.meta.env.VITE_FRONTEND_BASE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);

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
        form.setFields([
          {
            name,
            value: response.data.path,
            errors: [],
          },
        ]);
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
            <img
              src={assetUrl(value)}
              alt={label}
              className="max-h-36 max-w-full rounded border object-cover"
            />
            <span className="text-xs text-gray-500">Click or drop to replace</span>
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drop image here</p>
          </>
        )}
      </Upload.Dragger>
    </Form.Item>
  );
}

const textRules = [{ required: true, message: "Required" }];

const defaultHomeContent = {
  hero: {
    eyebrow: "Biswas Builders Limited",
    title: "We believe in quality not quantity",
    highlight: "since 1994",
    buttonText: "Explore Projects",
    secondaryButtonText: "Talk to sales",
    image: "/bbl/hero.jpg",
  },
  stats: {
    since: "1994",
    sinceLabel: "Established",
    team: "800+",
    teamLabel: "Team and workers",
    projects: "4+",
    projectsLabel: "Highlighted projects",
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
  about: {
    eyebrow: "About BBL",
    title: "We build residential, commercial, and infrastructure projects with quality and accountability",
    description:
      "Biswas Builders Limited has grown from apartment construction in Uttara into a prominent Bangladeshi real estate and construction company. The company delivers residential and commercial buildings, civil engineering works, land development, and infrastructure projects with a customer-first service philosophy.",
    quote: "Build with a trusted name since 1994.",
    image: "/bbl/about-home.png",
  },
  mission: {
    title: "We strive to deliver safe, lasting spaces with",
    highlightPrefix: "quality",
    highlight: "construction",
    images: ["/bbl/project-1.jpg", "/bbl/project-2.jpg", "/bbl/project-3.jpg", "/bbl/gallery-1.jpg"],
  },
  services: [
    {
      title: "Real estate and construction",
      description:
        "We develop residential and commercial spaces with practical planning, quality materials, and dependable execution.",
      image: "/bbl/project-1.jpg",
    },
    {
      title: "Sales and customer care",
      description:
        "Our customer care process keeps buyers informed from first inquiry through handover and after-sales support.",
      image: "/bbl/project-2.jpg",
    },
    {
      title: "Construction quality",
      description:
        "BBL coordinates engineering, procurement, supervision, and site teams to maintain consistent construction standards.",
      image: "/bbl/project-3.jpg",
    },
    {
      title: "Landowner partnership",
      description:
        "We work with landowners through transparent development partnerships focused on long-term value.",
      image: "/bbl/value.jpg",
    },
  ],
  projects: [
    { title: "Biswas Tower", location: "New Market, Dhaka", year: "2024", image: "/bbl/project-1.jpg" },
    { title: "Biswas Credence", location: "Dhaka", year: "2023", image: "/bbl/project-2.jpg" },
    { title: "Biswas Moyeen Tower", location: "Dhaka", year: "2022", image: "/bbl/project-3.jpg" },
    { title: "Saiham Future Complex", location: "Dhaka", year: "2021", image: "/bbl/project-banner.jpg" },
  ],
  testimonials: [
    {
      quote:
        "BBL gave us clear guidance, dependable communication, and confidence through every stage of the project.",
      author: "A BBL Client",
      image: "/bbl/gallery-1.jpg",
    },
    {
      quote:
        "Their professionalism and construction quality made the entire property journey smooth and reassuring.",
      author: "Apartment Owner",
      image: "/bbl/gallery-2.jpg",
    },
    {
      quote:
        "We valued the team's honesty, timely updates, and commitment to delivering what was promised.",
      author: "Landowner Partner",
      image: "/bbl/gallery-3.jpg",
    },
  ],
  choose: {
    eyebrow: "Why choose BBL",
    title: "A trusted quality you can rely on",
    items: [
      {
        title: "Clear communication",
        description: "We keep clients informed with practical guidance and responsive communication.",
      },
      {
        title: "Practical planning",
        description: "Each project is planned around location, utility, value, and long-term durability.",
      },
      {
        title: "Professional delivery",
        description: "Our engineering and site teams coordinate closely to keep work accountable.",
      },
      {
        title: "Design coordination",
        description: "We align planning, architecture, construction, and customer needs from the start.",
      },
    ],
  },
  team: [
    { name: "Nazrul Islam", role: "Leadership Team", image: "/bbl/certificate.jpg" },
    { name: "Engineering Team", role: "Project Delivery", image: "/bbl/project-1.jpg" },
    { name: "Sales Team", role: "Customer Care", image: "/bbl/project-2.jpg" },
  ],
  updates: [
    {
      category: "Real estate",
      date: "Project Update",
      title: "Transforming Dhaka spaces with dependable construction",
      author: "Leadership Team",
      role: "Project Team",
      image: "/bbl/gallery-1.jpg",
    },
    {
      category: "Real estate",
      date: "Project Update",
      title: "Quality construction starts with a trusted developer.",
      author: "Nazrul Islam",
      role: "Project Team",
      image: "/bbl/gallery-2.jpg",
    },
    {
      category: "Real estate",
      date: "Project Update",
      title: "From Uttara to Dhanmondi, BBL builds residential and commercial landmarks",
      author: "BBL Management",
      role: "Project Team",
      image: "/bbl/gallery-3.jpg",
    },
  ],
  sections: {
    services: {
      eyebrow: "Services",
      title: "Built around delivery",
      description: "Core capabilities for landowners, buyers, and real estate partners.",
    },
    projects: {
      eyebrow: "Selected Projects",
      title: "Spaces with lasting value",
      buttonText: "View all projects",
    },
    mission: {
      eyebrow: "Mission",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "Project owners and partners",
    },
    team: {
      eyebrow: "Team",
      title: "People behind delivery",
    },
    updates: {
      eyebrow: "Updates",
      title: "Latest from BBL",
    },
  },
};

const isObject = (value: unknown): value is Record<string, any> =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

function deepMerge<T>(base: T, override: any): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) && override.length ? override : base) as T;
  }

  if (!isObject(base)) {
    return (override ?? base) as T;
  }

  const merged: Record<string, any> = { ...base };
  Object.keys(base).forEach((key) => {
    merged[key] = deepMerge((base as Record<string, any>)[key], override?.[key]);
  });

  return merged as T;
}

export default function HomeCms() {
  const [form] = Form.useForm();
  const { messageApi } = useMessageStore();

  const { data: homePage, isLoading, refetch } = useQuery({
    queryKey: ["cms-page-home"],
    queryFn: async () => {
      const response = await axiosInstance.post(endpoints.cmsFindWhere, {
        where: { slug: "home" },
      });
      const page = response.data?.[0] as CmsPage | undefined;
      return page
        ? { ...page, content: deepMerge(defaultHomeContent, page.content) }
        : undefined;
    },
  });

  useEffect(() => {
    form.setFieldsValue(homePage?.content || defaultHomeContent);
  }, [form, homePage]);

  const saveMutation = useMutation({
    mutationFn: async (content: Record<string, any>) => {
      const mergedContent = deepMerge(defaultHomeContent, {
        ...(homePage?.content || {}),
        ...content,
      });
      const payload = {
        slug: "home",
        title: "Home",
        status: "published",
        published_at: new Date().toISOString(),
        content: mergedContent,
        metadata: {
          description: "BBL homepage",
        },
      };

      if (homePage?.id) {
        return axiosInstance.patch(`/crud/${homePage.id}?model=cmsPage`, payload);
      }

      return axiosInstance.post(endpoints.cmsPages, payload);
    },
    onSuccess: async () => {
      await revalidateCms("home");
      messageApi?.success("Home page saved");
      await refetch();
    },
    onError: (error: any) => {
      messageApi?.error(error?.response?.data?.message || "Could not save home page");
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-112px)] items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      {setPageTitle("Home CMS")}
      <PageTitle title="Home CMS" breadcrumbs={[]} />

      <Form
        form={form}
        layout="vertical"
        initialValues={defaultHomeContent}
        onFinish={(values) => saveMutation.mutate(values)}
      >
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
                    <Col md={12} xs={24}><Form.Item name={["hero", "buttonText"]} label="Primary Button Text" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["hero", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["hero", "highlight"]} label="Subtitle" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["hero", "secondaryButtonText"]} label="Secondary Button Text" rules={textRules}><Input /></Form.Item></Col>
                    <Col xs={24}><ImageField name={["hero", "image"]} label="Hero Image / Video Poster" /></Col>
                  </Row>
                </Card>
              ),
            },
            {
              key: "stats",
              label: "Stats",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col md={8} xs={24}><Form.Item name={["stats", "since"]} label="Established Value" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={16} xs={24}><Form.Item name={["stats", "sinceLabel"]} label="Established Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={8} xs={24}><Form.Item name={["stats", "team"]} label="Team Value" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={16} xs={24}><Form.Item name={["stats", "teamLabel"]} label="Team Label" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={8} xs={24}><Form.Item name={["stats", "projects"]} label="Projects Value" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={16} xs={24}><Form.Item name={["stats", "projectsLabel"]} label="Projects Label" rules={textRules}><Input /></Form.Item></Col>
                  </Row>
                </Card>
              ),
            },
            {
              key: "features",
              label: "Feature Cards",
              forceRender: true,
              children: (
                <Form.List name="features">
                  {(fields) => (
                    <Row gutter={16}>
                      {fields.map((field, index) => (
                        <Col md={8} xs={24} key={field.key}>
                          <Card title={`Feature ${index + 1}`}>
                            <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                            <Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={5} /></Form.Item>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Form.List>
              ),
            },
            {
              key: "about",
              label: "About",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col md={12} xs={24}><Form.Item name={["about", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                    <Col xs={24}><Form.Item name={["about", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col>
                    <Col xs={24}><Form.Item name={["about", "description"]} label="Description" rules={textRules}><Input.TextArea rows={5} /></Form.Item></Col>
                    <Col xs={24}><Form.Item name={["about", "quote"]} label="Quote" rules={textRules}><Input /></Form.Item></Col>
                    <Col xs={24}><ImageField name={["about", "image"]} label="About Image" /></Col>
                  </Row>
                </Card>
              ),
            },
            {
              key: "services",
              label: "Services",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Row gutter={16}>
                      <Col md={12} xs={24}><Form.Item name={["sections", "services", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={12} xs={24}><Form.Item name={["sections", "services", "title"]} label="Section Title" rules={textRules}><Input /></Form.Item></Col>
                      <Col xs={24}><Form.Item name={["sections", "services", "description"]} label="Section Description" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col>
                    </Row>
                  </Card>
                  <Form.List name="services">
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={12} xs={24} key={field.key}>
                              <Card
                                title={`Service ${index + 1}`}
                                className="mb-4"
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={4} /></Form.Item>
                                <ImageField name={["services", field.name, "image"]} label="Image" />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ title: "", description: "", image: "" })}>
                          Add Service
                        </Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: "projects",
              label: "Projects",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Row gutter={16}>
                      <Col md={8} xs={24}><Form.Item name={["sections", "projects", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={8} xs={24}><Form.Item name={["sections", "projects", "title"]} label="Section Title" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={8} xs={24}><Form.Item name={["sections", "projects", "buttonText"]} label="Button Text" rules={textRules}><Input /></Form.Item></Col>
                    </Row>
                  </Card>
                  <Form.List name="projects">
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={12} xs={24} key={field.key}>
                              <Card
                                title={`Project ${index + 1}`}
                                className="mb-4"
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "location"]} label="Location" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "year"]} label="Year" rules={textRules}><Input /></Form.Item>
                                <ImageField name={["projects", field.name, "image"]} label="Image" />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ title: "", location: "", year: "", image: "" })}>
                          Add Project
                        </Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: "mission",
              label: "Mission",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col xs={24}><Form.Item name={["sections", "mission", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={12} xs={24}><Form.Item name={["mission", "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["mission", "highlightPrefix"]} label="Highlight Prefix" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={6} xs={12}><Form.Item name={["mission", "highlight"]} label="Highlight" rules={textRules}><Input /></Form.Item></Col>
                    {[0, 1, 2, 3].map((index) => (
                      <Col md={8} xs={24} key={index}>
                        <ImageField name={["mission", "images", index]} label={`Mission Image ${index + 1}`} />
                      </Col>
                    ))}
                  </Row>
                </Card>
              ),
            },
            {
              key: "testimonials",
              label: "Testimonials",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Row gutter={16}>
                      <Col md={12} xs={24}><Form.Item name={["sections", "testimonials", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={12} xs={24}><Form.Item name={["sections", "testimonials", "title"]} label="Section Title" rules={textRules}><Input /></Form.Item></Col>
                    </Row>
                  </Card>
                  <Form.List name="testimonials">
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={8} xs={24} key={field.key}>
                              <Card
                                title={`Testimonial ${index + 1}`}
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "quote"]} label="Quote" rules={textRules}><Input.TextArea rows={5} /></Form.Item>
                                <Form.Item name={[field.name, "author"]} label="Author" rules={textRules}><Input /></Form.Item>
                                <ImageField name={["testimonials", field.name, "image"]} label="Image" />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ quote: "", author: "", image: "" })}>
                          Add Testimonial
                        </Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: "choose",
              label: "Why Choose",
              forceRender: true,
              children: (
                <Card>
                  <Row gutter={16}>
                    <Col md={8} xs={24}><Form.Item name={["choose", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                    <Col md={16} xs={24}><Form.Item name={["choose", "title"]} label="Title" rules={textRules}><Input /></Form.Item></Col>
                  </Row>
                  <Form.List name={["choose", "items"]}>
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={12} xs={24} key={field.key}>
                              <Card
                                title={`Why Choose Item ${index + 1}`}
                                className="mb-4"
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "description"]} label="Description" rules={textRules}><Input.TextArea rows={3} /></Form.Item>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ title: "", description: "" })}>
                          Add Why Choose Item
                        </Button>
                      </>
                    )}
                  </Form.List>
                </Card>
              ),
            },
            {
              key: "team",
              label: "Team",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Row gutter={16}>
                      <Col md={12} xs={24}><Form.Item name={["sections", "team", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={12} xs={24}><Form.Item name={["sections", "team", "title"]} label="Section Title" rules={textRules}><Input /></Form.Item></Col>
                    </Row>
                  </Card>
                  <Form.List name="team">
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={8} xs={24} key={field.key}>
                              <Card
                                title={`Team Member ${index + 1}`}
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "name"]} label="Name" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "role"]} label="Role" rules={textRules}><Input /></Form.Item>
                                <ImageField name={["team", field.name, "image"]} label="Image" />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button icon={<PlusOutlined />} onClick={() => add({ name: "", role: "", image: "" })}>
                          Add Team Member
                        </Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
            {
              key: "updates",
              label: "Updates",
              forceRender: true,
              children: (
                <>
                  <Card className="mb-4">
                    <Row gutter={16}>
                      <Col md={12} xs={24}><Form.Item name={["sections", "updates", "eyebrow"]} label="Eyebrow" rules={textRules}><Input /></Form.Item></Col>
                      <Col md={12} xs={24}><Form.Item name={["sections", "updates", "title"]} label="Section Title" rules={textRules}><Input /></Form.Item></Col>
                    </Row>
                  </Card>
                  <Form.List name="updates">
                    {(fields, { add, remove }) => (
                      <>
                        <Row gutter={16}>
                          {fields.map((field, index) => (
                            <Col md={12} xs={24} key={field.key}>
                              <Card
                                title={`Update ${index + 1}`}
                                className="mb-4"
                                extra={<Button danger size="small" icon={<DeleteOutlined />} onClick={() => remove(field.name)} />}
                              >
                                <Form.Item name={[field.name, "category"]} label="Category" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "date"]} label="Date Label" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "title"]} label="Title" rules={textRules}><Input.TextArea rows={2} /></Form.Item>
                                <Form.Item name={[field.name, "author"]} label="Author" rules={textRules}><Input /></Form.Item>
                                <Form.Item name={[field.name, "role"]} label="Role" rules={textRules}><Input /></Form.Item>
                                <ImageField name={["updates", field.name, "image"]} label="Image" />
                              </Card>
                            </Col>
                          ))}
                        </Row>
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => add({ category: "", date: "", title: "", author: "", role: "", image: "" })}
                        >
                          Add Update
                        </Button>
                      </>
                    )}
                  </Form.List>
                </>
              ),
            },
          ]}
        />

        <div className="sticky bottom-0 z-10 mt-4 flex justify-end border-t bg-white py-4 dark:bg-black">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveMutation.isPending}>
            Save Home Page
          </Button>
        </div>
      </Form>
    </>
  );
}
