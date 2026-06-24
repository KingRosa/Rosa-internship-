import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        // Fetch items specifically for this author
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        // Assuming the NFT list is in a property called 'nftCollection'
        setItems(data.nftCollection);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    }
    fetchItems();
  }, [authorId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="de_tab_content">
      <div className="row">
        {items.map((item, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="nft__item">
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt={item.title} />
              </Link>
              <h4>{item.title}</h4>
              <div className="nft__item_price">{item.price} ETH</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorItems;