import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Header from "../components/Header"
import SEO from "../components/SEO"
import activityStyles from "../styles/activities.module.css"

const Card = ({ image, title, date, slug }) => {
  return (
    <section className={activityStyles.card}>
      <Img className={activityStyles.cardImage} fixed={image} />
      <section>
        <h4 className={activityStyles.cardHeader}>{title}</h4>
        <p className={activityStyles.date}>Date: {date}</p>
      </section>
      <section>
        <Link style={{ color: "#30336B" }} to={`${slug}`}>
          Read More
        </Link>
      </section>
    </section>
  )
}

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "events" } } }
        sort: { fields: frontmatter___eventNum, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM Do, YYYY")
              slug
              thumbnail {
                childImageSharp {
                  fixed(height: 266, width: 288) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={"Events - KC Entrepreneurship Cell"} />
      <section style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <Header headerText={"Events"} />
        <section className={activityStyles.cardContainer}>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Card
              key={node.id}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              slug={node.frontmatter.slug}
              image={node.frontmatter.thumbnail.childImageSharp.fixed}
            />
          ))}
        </section>
      </section>
    </Layout>
  )
}
