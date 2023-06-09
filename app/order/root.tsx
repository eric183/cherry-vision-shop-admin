"use client";

import { useState } from "react";
import useColumns from "./columns";
import { useQuery } from "@tanstack/react-query";
import ProductModal from "../../components/Layout/Modal";
import CreateButton from "./createButton";
import { IOrder, IOrderCreateSource } from "~types/order";
import OrderForm from "./form";
import CherryTable from "~components/CherryViews/Table";
import { useRouter } from "next/router";
import { fetchGlobal } from "~app/api/sanityRest/global";
import OrderProductionDrawer from "./drawer";
import orderQuery from "~app/api/groqs/order";
import { sanityClient } from "~base/sanity/client";

const Root = () => {
  const reponseGlobal = useQuery({
    queryKey: ["global"],
    queryFn: async () => await fetchGlobal(),
  });

  const { data, status } = useQuery({
    queryKey: ["order"],
    queryFn: async () =>
      await sanityClient.fetch<IOrder[]>(orderQuery, {
        start: 0,
        limit: 5,
        // start: 0,
      }),
  });

  const [column] = useColumns(reponseGlobal.refetch);
  if (status !== "success" || reponseGlobal.status !== "success") return null;

  console.log(reponseGlobal.data, "....");
  console.log(data);
  return (
    <>
      <CreateButton datasource={data} />

      <ProductModal>
        <OrderForm
          datasource={data}
          createSource={
            {
              accounts: reponseGlobal.data.accounts,
              skus: reponseGlobal.data.skus,
            } as const as IOrderCreateSource
          }
        />
      </ProductModal>

      <OrderProductionDrawer />
      <section>
        <CherryTable<IOrder>
          datasource={data}
          columns={column}
          keyIndex={"_id"}
          status={status}
        ></CherryTable>
      </section>
    </>
  );
};

export default Root;
