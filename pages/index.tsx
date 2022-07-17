import { Container, Link, List, ListItem } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

const HomePage: NextPage = () => (
  <Container py={8}>
    <List>
      <ListItem>
        <NextLink href="/venue/o2-ritz" passHref>
          <Link>O2 Ritz</Link>
        </NextLink>
      </ListItem>
      <ListItem>
        <NextLink href="/venue/albert-hall-manchester" passHref>
          <Link>Albert Hall Manchester</Link>
        </NextLink>
      </ListItem>
      <ListItem>
        <NextLink href="/venue/o2-academy-brixton" passHref>
          <Link>O2 Academy Brixton</Link>
        </NextLink>
      </ListItem>
    </List>
  </Container>
);

export default HomePage;
