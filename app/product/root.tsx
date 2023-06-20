"use client";

import { ColumnsType } from "antd/es/table";
import { use, useEffect, useState } from "react";
import CherryTable from "~components/CherryViews/Table";
import { IProduct } from "~types/product";
import useColumns from "./columns";
import { useQuery } from "@tanstack/react-query";
import ProductModal, { modalStore } from "../../components/Layout/Modal";
import CreateButton from "./createButton";
import GoogleUploader from "~components/Layout/GoogleUploader";
import { Select } from "antd";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import ProductForm from "./form";
import productQuery from "~app/api/groqs/product";
import { sanityClient } from "~base/sanity/client";

const Root: React.FC<{
  // response: Promise<IProduct[]>;
}> = () => {
  const [teststate, setTeststate] = useState("test");
  const { data, status, refetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () =>
      await sanityClient.fetch<IProduct[]>(productQuery, {
        start: 0,
        limit: 50,
        // start: 0,
      }),
  });
  const [column] = useColumns();

  // if (status !== "success") return null;

  // console.log("data", data, "data");

  return (
    <>
      <CreateButton datasource={data ? data : []} />

      <ProductModal>
        <ProductForm datasource={data ? data : []} refetch={refetch} />
      </ProductModal>
      <section>
        <CherryTable<IProduct>
          datasource={data ? data : []}
          columns={column as ColumnsType<IProduct>}
          keyIndex={"_id"}
          status={status}
        ></CherryTable>
      </section>
    </>
  );
};

export default Root;
