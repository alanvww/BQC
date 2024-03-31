'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import client from '../../../../tina/__generated__/client';

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
			<h1 data-tina-field={tinaField(data, 'title')}>{data.post.title}</h1>

			<ContentSection
				tinaField={tinaField(data, 'body')}
				content={data.post.body}
			/>
		</div>
	);
};

const ContentSection = ({ tinaField, content }) => (
	<div className="relative py-16 bg-white overflow-hidden text-black">
		<TinaMarkdown data-tina-field={tinaField} content={content} />
	</div>
);

export default BlogPage;
