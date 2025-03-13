import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {

	const posts = await getCollection('blog').map((post) => ({
		...post.data,
		link: `/blog/${post.id}/`,
	}));
	
	const resources = await getCollection('resources').map((resource) => ({
		...resource.data,
		link: `/resources/${resource.id}/`,
	}));
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: [...posts, ...resources],
	});
}
