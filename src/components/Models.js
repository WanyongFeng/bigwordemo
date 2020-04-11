import React from "react";

function Models({models}) {
  return (
    <p>
      {models.map((v) => (
        <b style = {{color:"white", fontSize:"25px"}}>
          {v.from} → {v.to} &nbsp; &nbsp; &nbsp;
        </b>
      ))}
    </p>
  );
}

export default Models;
