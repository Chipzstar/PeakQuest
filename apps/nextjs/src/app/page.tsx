// import { api } from "~/trpc/server";
import {
  CreatePostForm,
} from "./_components/posts";

export const runtime = "edge";

export default async function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // const posts = api.post.all();

  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>

        <CreatePostForm />
        <div className="w-full max-w-2xl overflow-y-scroll">
        </div>
      </div>
    </main>
  );
}
