// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useFetchData(endpoint) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(endpoint);
//       setData(res.data.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (endpoint) fetchData();
//   });

//   return { data, loading, error };
// }
