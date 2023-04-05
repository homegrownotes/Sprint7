import styled from "styled-components";
import React, { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Checkbox = ({ data, onChange }) => {
  const [total, setTotal] = useState(0); // => Define "price state".

  const handleCheckboxChange = (e) => {
    const {
      checked: isChecked,
      dataset: { price, id },
    } = e.target; // => Destructuring to clean "code".

    if (isChecked) {
      setTotal((prevTotal) => prevTotal + parseFloat(price));
    } else {
      setTotal((prevTotal) => prevTotal - parseFloat(price));
    }
  };

  return (
    <Container>
      {data &&
        data.map((e) => (
          <div style={{ display: "flex" }} key={e.id}>
            <></>
            <label>
              <input // => Assigning a unique key for the input element as well.
                key={`checkbox-${e.id}`}
                type="checkbox"
                data-price={e.price}
                onChange={handleCheckboxChange}
                data-id={e.id}
              />
              {e.option} ({e.price} €)
            </label>
          </div>
        ))}
      <div>
        <p> Precio Total: {total} €</p>
      </div>
    </Container>
  );
};
