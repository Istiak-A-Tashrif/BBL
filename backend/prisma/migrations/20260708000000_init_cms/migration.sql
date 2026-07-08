CREATE TABLE "cms_pages" (
  "id" SERIAL NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "content" JSONB NOT NULL DEFAULT '{}',
  "metadata" JSONB,
  "published_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "cms_pages_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cms_pages_slug_key" ON "cms_pages"("slug");
CREATE INDEX "cms_pages_status_idx" ON "cms_pages"("status");
