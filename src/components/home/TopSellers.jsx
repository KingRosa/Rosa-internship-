import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  async function fetchSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <ol className="author_list">
      {sellers.map((seller) => (
        <li key={seller.id}>
          <div className="coll_list_pp">
            <Link to={`/author/${seller.authorId}`}>
              <img src={seller.authorImage} alt="author" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div className="author_list_info">
            <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
            <span>{seller.price} ETH</span>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default TopSellers;
