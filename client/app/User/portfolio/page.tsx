"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortfolioList from "@/app/components/PortfolioList";
import CreatePortfolio from "./create/page";
import SlideMenu from "@/app/components/SlideMenu";

interface portfolioProps {
  value: boolean;
}

const Portfolio: React.FC<portfolioProps> = ({ value }) => {
  const navigate = useRouter();
  const [userID, setUserID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [iscreateOpen, setIsCreateOpen] = useState(false);
  // const userID = sessionStorage?.getItem("userId");

  useEffect(() => {
    // This will only run on the client
    setIsLoading(true);
    const storedUserID = sessionStorage.getItem("userId");
    if (storedUserID) {
      setUserID(storedUserID);
    } else {
      navigate.push("/"); // Redirect to login if no user ID is found
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/portfolio?userID=${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status === 404) {
          // navigate.push("/User/portfolio/create");
          setIsCreateOpen(true);
          setIsLoading(false);
        } else {
          console.log("Portfolio details:", data); // Handle the portfolio details
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setIsLoading(false);
      }
      // finally {
      //   setIsLoading(false); // End loading
      // }
    };

    if (userID) {
      console.log(userID);
      fetchPortfolio();
    } else {
      if (!isLoading) {
        navigate.push("/"); // Redirect to login if no userID
      }
      setIsLoading(false);
    }
  }, [userID, navigate]);

  const handleCancel = () => {
    window.location.href = "/User";
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        className={`ant-list ant-list-lg ant-list-split ant-list-something-after-last-item css-var-rmis ${
          value ? "bg-black" : "bg-stone-50"
        } w-full ${iscreateOpen ? "hidden" : "block"}`}
      >
        {/* <h1
          className={`${
            value ? "text-white" : "text-black"
          } align-middle text-center font-bold text-xl mb-2`}
        >
          My Portfolios
        </h1> */}
        <PortfolioList value={value} />
      </div>
      <CreatePortfolio isOpen={iscreateOpen} onClose={handleCancel} />
    </div>
  );
};

export default Portfolio;
