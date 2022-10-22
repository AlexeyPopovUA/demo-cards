import React from "react";

import "./card.scss";

type Props = {
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
}

const Card = (props: Props) => {
    return <div className="card col-4 p-card--highlighted demo-p-card">
        <header className="p-card__header">
            <h3>{props.type}</h3>
        </header>
        <div className="p-card__content">
            <a className="p-card__image" href={props.link}><img src={props.imageData.src} alt={props.imageData.alt}/></a>
            <h3 className="p-heading-3"><a href={props.link}>{props.title}</a></h3>
            <div>By {props.authors.map(author => <a key={author.name} href={author.link}>{author.name}&nbsp;</a>)} on {props.date}</div>
        </div>
        <div className="p-card__footer">
            <hr className="is-muted" />
            <div>{props.category}</div>
        </div>
    </div>
}

export default Card;
