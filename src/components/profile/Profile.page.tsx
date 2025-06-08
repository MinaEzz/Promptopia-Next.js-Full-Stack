import PageHeader from "./page-header/PageHeader.component";
import PostsSection from "./posts-section/PostsSection.component";

export default function Profile({ userId }: { userId: string }) {
  return (
    <section className="w-full py-8">
      <PageHeader userId={userId} />
      <PostsSection userId={userId} />
    </section>
  );
}
