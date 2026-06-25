import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthor() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching author:", error);
        setLoading(false);
      }
    }
    fetchAuthor();
  }, [id]);

  // If still loading or data hasn't arrived, show loading
  if (loading || !author) return <div className="text-center">Loading...</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
  {/* This wrapper forces horizontal alignment */}
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    
    <div className="profile_avatar">
      <img 
        src={author.authorImage || author.author_image || author.avatar || author.image} 
        alt={author.authorName} 
      />
      <i className="fa fa-check"></i>
    </div>
    
    {/* Adding margin-left creates space between the avatar and name */}
    <div className="profile_name" style={{ marginLeft: "20px" }}>
      <h4>
        {author.authorName}
        <span className="profile_username">@{author.tag}</span>
        <span id="wallet" className="profile_wallet">
          {author.address}
        </span>
        <button id="btn_copy" title="Copy Text">Copy</button>
      </h4>
    </div>

  </div>
  
  <div className="profile_follow">
    <div className="de-flex-col">
      <div className="profile_follower">{author.followers} followers</div>
      <button className="btn-main">Follow</button>
    </div>
  </div>
</div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={id} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
