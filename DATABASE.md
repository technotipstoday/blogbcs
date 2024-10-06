
## blog_posts

```sql

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'blog_posts';

     column_name     |     data_type     | is_nullable |             column_default
---------------------+-------------------+-------------+----------------------------------------
 id                  | integer           | NO          | nextval('blog_posts_id_seq'::regclass)
 title               | character varying | NO          |
 seo_title           | character varying | YES         |
 slug                | character varying | NO          |
 date                | date              | NO          |
 content             | text              | NO          |
 image               | text              | YES         |
 image_alt_text      | text              | YES         |
 meta_description    | text              | YES         |
 focus_keywords      | character varying | YES         |
 canonical_url       | character varying | YES         |
 schema_markup       | text              | YES         |
 robots_meta         | character varying | YES         | 'index, follow'::character varying
 og_title            | character varying | YES         |
 og_description      | text              | YES         |
 og_image            | character varying | YES         |
 og_url              | character varying | YES         |
 twitter_title       | character varying | YES         |
 twitter_description | text              | YES         |
 twitter_image       | character varying | YES         |
 published_on        | date              | NO          |
 updated_on          | date              | YES         |
 author_id           | integer           | NO          |
```