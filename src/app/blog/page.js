import Image from 'next/image';
import client from '../../../tina/__generated__/client';

const postsResponse = await client.queries.postConnection();
const posts = postsResponse.data.postConnection.edges.map((post) => {
	console.log(post);
	return { slug: post.node._sys.filename };
});

export default function Blog() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{posts.map((post) => (
				<a
					key={post.slug}
					href={`/blog/${post.slug}`}
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2 className={`mb-3 text-2xl font-semibold`}>
						{post.slug}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
						Find in-depth information about Next.js features and API.
					</p>
				</a>
			))}
		</main>
	);
}
