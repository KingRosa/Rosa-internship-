import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// Assuming you have AuthorItems and AuthorBanner components
import AuthorItems from "../components/author/AuthorItems";
import AuthorBanner from "../components/author/AuthorBanner";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  async function fetchAuthor() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
  }

  useEffect(() => {
    fetchAuthor();
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section id="profile_banner" className="no-bottom no-top">
          <AuthorBanner author={author} />
        </section>
        <section className="container">
          <div className="row">
            <AuthorItems author={author} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
