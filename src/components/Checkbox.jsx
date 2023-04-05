import styled from "styled-components";
import React, { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Checkbox = ({ data, onChange }) => {
  const [total, setTotal] = useState(0); // => Define "price state".
  const [numPages, setNumPages] = useState(0); // => Define "price pages state".
  const [numLanguages, setNumLanguages] = useState(0); // => Define "price languages state".
  const [showExtraOptions, setShowExtraOptions] = useState(false); // => Define "extras state".
  const [resetExtras, setResetExtras] = useState(false); // => Define "reset extras state".

  const handleCheckboxChange = (e) => {
    const {
      checked: isChecked,
      dataset: { price, id },
    } = e.target; // => Destructuring to clean "code".

    if (id === "1") {
      // => The value getted by "dataset" is a string, not a number.
      setShowExtraOptions(isChecked);
      if (!isChecked) {
        setResetExtras(true);
      }
    }

    if (isChecked) {
      setTotal((prevTotal) => prevTotal + parseFloat(price));
      if (id === "1") {
        setResetExtras(false);
      }
    } else {
      setTotal((prevTotal) => prevTotal - parseFloat(price));
    }
  };

  const handleNumPagesChange = (e) => {
    const { value } = e.target;
    setNumPages(value);
  };

  const handleNumLanguagesChange = (e) => {
    const { value } = e.target;
    setNumLanguages(value);
  };

  const extraOptionsPrice = resetExtras ? 0 : numPages * numLanguages * 30;

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
              {showExtraOptions && e.id === 1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    borderStyle: "solid",
                    borderRadius: "15px",
                    padding: "35px 20px",
                    margin: "10px",
                  }}
                >
                  <label style={{ paddingBottom: "15px" }}>
                    Número de páginas:
                    <input
                      type="number"
                      min="0"
                      value={numPages}
                      onChange={handleNumPagesChange}
                    />
                  </label>
                  <label>
                    Número de idiomas:
                    <input
                      type="number"
                      min="0"
                      value={numLanguages}
                      onChange={handleNumLanguagesChange}
                    />
                  </label>
                </div>
              )}
            </label>
          </div>
        ))}
      <div>
        <p> Precio Total: {total + extraOptionsPrice} €</p>
      </div>
    </Container>
  );
};
