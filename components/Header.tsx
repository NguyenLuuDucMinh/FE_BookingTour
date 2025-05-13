import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {/* <Link href="/tour">Tours</Link> */}
        <Link href="/user">User</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
};

export default Header;
