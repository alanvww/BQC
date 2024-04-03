'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import client from '../../../../tina/__generated__/client';
import Image from 'next/image';

const BlogPage = () => {
	const [initialData, setInitialData] = useState(null);
	const [query, setQuery] = useState('');
	const [variables, setVariables] = useState({});
	const filename = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const variables = { relativePath: `${filename.post}.md` };
			try {
				const res = await client.queries.post(variables);
				setInitialData(res.data);
				setQuery(res.query);
				setVariables(variables);
			} catch (error) {
				console.error('Error fetching data:', error);
				setInitialData(null);
			}
		};

		fetchData();
	}, [filename]);

	const { data } = useTina({
		query,
		variables,
		data: initialData,
	});

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<div className="flex-col ">
				<div className="bg-white py-4 w-full justify-center items-center flex">
					<Image
						src={data.post.imgSrc}
						width={1000}
						height={1000}
						alt="Picture of the author"
						data-tina-field={tinaField(data.post, 'imgSrc')}
					/>
				</div>

				<h1
					className="px-2 py-4 w-full h-24 text-4xl font-bold text-center text-zinc-950 bg-gray-200 justify-center items-center flex"
					data-tina-field={tinaField(data.post, 'title')}
				>
					{data.post.title}
				</h1>
				<p
					className="px-2 py-4 w-full h-24 text-xl font-bold  text-zinc-600 bg-gray-200 justify-center items-center flex"
					data-tina-field={tinaField(data.post, 'description')}
				>
					{data.post.description}
				</p>
			</div>
			<div
				data-tina-field={tinaField(data.post, 'body')}
				className="relative py-16 bg-white overflow-hidden text-black"
			>
				<TinaMarkdown content={data.post.body} />
			</div>
		</div>
	);
};

export default BlogPage;
