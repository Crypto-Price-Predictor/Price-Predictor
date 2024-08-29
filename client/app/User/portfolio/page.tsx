import Link from "next/link";

const Portfolio = () => {
  return (
    <div>
      <h1>Gmail API Example</h1>
      <Link href="/api/auth">
        <button>Connect to Gmail</button>
      </Link>
    </div>
  );
};

export default Portfolio;
