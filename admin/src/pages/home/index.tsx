import { FileTextOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Statistic } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { endpoints } from "../../api/endpoints";
import PageTitle from "../../components/PageTitle";
import { setPageTitle } from "../../utils/setPageTitle";

function Index() {
  const { isLoading, data: fetchData } = useQuery({
    queryKey: ["cms-pages"],
    queryFn: async () => {
      const response = await axiosInstance.get(endpoints.cmsPages);
      return response.data;
    },
  });

  const totalPages = fetchData?.length || 0;
  const publishedPages =
    fetchData?.filter((page: any) => page.status === "published").length || 0;

  return (
    <>
      {setPageTitle("Dashboard")}
      <PageTitle title={"Dashboard"} breadcrumbs={[]} />

      <>
        <Row gutter={[16, 16]}>
          {/* Total Users Card */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered={false}>
              <Statistic title="CMS Entries" value={totalPages} prefix={<FileTextOutlined />} loading={isLoading} />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Card bordered={false}>
              <Statistic
                title="Published Entries"
                value={publishedPages}
                valueStyle={{ color: "#1890ff" }}
                loading={isLoading}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
}

export default Index;
