import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Feed</a>
    </Link>
    <Link href="/drafts">
      <a style={linkStyle}>Drafts</a>
    </Link>
    <Link href="/signup">
      <a style={linkStyle}>Signup</a>
    </Link>
    <Link href="/create">
      <a style={linkStyle}>Create draft</a>
    </Link>
  </div>
);

export default Header;