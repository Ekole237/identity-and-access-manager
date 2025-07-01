import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type CardProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  href?: string;
};
function CardAdmin({ children, title, description, href }: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {href && (
          <Button variant="outline">
            <Link href={href}>View</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CardAdmin;
