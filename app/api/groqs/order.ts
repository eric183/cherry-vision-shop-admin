import { groq } from "next-sanity";

const orderQuery = groq`*[_type == "order"]{
  _id,
  sortNumber,
  orderStatus,
  deposit,
  finalPayment,
  discount,
  "skus": *[_type == "sku"] { 
    _id, 
    attribute, 
    "spu": *[_type == "spu" && _id == ^.spu._ref][0]{ 
      "spuId": _id, 
      name, 
    }
  },
  "orderItems": orderItems[]-> {
    _id,
    quantity,
    _ref,
    preOrderPrice,
    isProductionPurchased,
    discount,
    sku-> {
      _id,
      "color": attribute.color,
      "size": attribute.size,
      "spu": *[_type == "spu" && _id == ^.spu._ref][0] {_id, name, "imageURLs": images[]{asset->{_id, _ref, url}}}
    }
  },
  "account": account-> { _id, username },
  "shipments": shipments[]-> { _id, carrier, url, address, trackingNumber, type },
  _createdAt,
  _updatedAt,
}`;
// "orderItems": orderItems[]-> {..., "sku": sku->, "spu": sku->spu},
// "account": account-> {..., "avatar": avatar.asset->url},
// "finalPayment": sum(orderItems[]->sku->price),
// "deposit": sum(orderItems[]->sku->price * orderItems[]->quantity),
// : orderItems[]-> {
//   _id,
//   quantity,
//   preOrderPrice,
//   "sku": *[_type == "sku" && _id == ^.sku._ref] {
//     _id,
//     "color": attribute.color,
//     "size": attribute.size,
//     "spu": *[_type == "spu" && _id == ^.spu._ref] {_id, name}[0]
//   }[0]
// },
export default orderQuery;
