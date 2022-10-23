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
        <header className="p-card__header demo-p-card__header">
            <h5 className="p-muted-heading demo-p-card__type">{props.type}</h5>
            <hr className="is-muted u-no-margin--bottom" />
        </header>
        <div className="p-card__content demo-p-card__content">
            <a className="p-card__image" href={props.link}><img src={props.imageData.src} alt={props.imageData.alt}/></a>
            <h3 className="demo-p-card__heading"><a href={props.link} className="p-button__link">{props.title}</a></h3>
            <p><em>By {props.authors.map(author => <a key={author.name} href={author.link}>{author.name}&nbsp;</a>)} on {props.date}</em></p>
        </div>
        <div className="p-card__footer demo-p-card__footer">
            <hr className="is-muted" />
            <div>{props.category}</div>
        </div>
    </div>
}

export default Card;
