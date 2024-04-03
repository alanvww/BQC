import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/blog">Blog</Link>
			<Link href="/admin/index.html">Admin</Link>
		</main>
	);
}
