import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('BlogPosts', ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	}));

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			const { title, description, date, ...customData } = post.data;

			return {
				title,
				description,
				link: post.slug,
				pubDate: date
			}
		}),
		customData: `<language>en-gb</language>`
	});
}
