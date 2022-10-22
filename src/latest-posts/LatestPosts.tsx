import React from "react";

import Card from "../card/Card";

type Props = {};
type Post = {
    id: number;
    title: string;
    link: string;
    type: string;
    category: string;
    date: string;
    imageData: {
        alt: string;
        src: string;
    };
    authors: {
        name: string;
        link: string;
    }[];
};
type State = {
    posts: Post[]
};

export default class LatestPosts extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        const response = await fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json");
        const data: unknown[] = await response.json();

        const posts = data
            // ensure that we take first 3 posts
            .slice(0, 3)
            // transform raw data for rendering
            .map(record => this.preparePostData(record));

        this.setState({posts});
    }

    private preparePostData(rawData: any): Post {
        return {
            id: rawData.id,
            title: rawData.title.rendered,
            link: rawData.link,
            imageData: {
                src: rawData.featured_media,
                // take image title or the article title for the "alt" attribute
                alt: rawData._embedded["wp:featuredmedia"]?.[0].title.rendered ?? rawData.title.rendered
            },
            authors: rawData._embedded?.author.map(a => ({name: a.name, link: a.link})) ?? [{name: "unknown", link: "/"}],
            date: new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric'}).format(new Date(rawData.date)),
            category: this.findTermsByTaxonomy(rawData._embedded["wp:term"], "category")?.[0].name ?? "",
            type: (
                // try to get the topic
                this.findTermsByTaxonomy(rawData._embedded["wp:term"], "topic") ||
                // fallback to the first post_tag
                this.findTermsByTaxonomy(rawData._embedded["wp:term"], "post_tag")
            )?.[0].name.toUpperCase() ?? "",
        }
    }

    private findTermsByTaxonomy(terms: any[] = [], taxonomy: string) {
        return terms.find((terms: any[]) => terms.some(item => item?.taxonomy === taxonomy ?? false))
    }

    render() {
        return <div className="articles-row row p-strip">
            {this.state.posts.length > 0
                ? this.state.posts.map(post =>
                    <Card key={post.id} title={post.title} link={post.link}
                          type={post.type} category={post.category}
                          imageData={post.imageData}
                          authors={post.authors} date={post.date}/>)
                : <div className="loader"><i className="p-icon--spinner u-animation--spin"></i>&nbsp;Loading...</div>}
        </div>;
    }
}
