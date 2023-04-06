import styled from "styled-components";
import React, { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  background-color: #fa8072;
  color: white;
  border-style: none;
  border-radius: 5px;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 30px;
  border-style: none;
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
        setNumPages(0); // Reset the state to 0 when the checkbox is unchecked.
        setNumLanguages(0);
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
    const value = parseInt(e.target.value);
    setNumPages(value);
  };

  const handleNumLanguagesChange = (e) => {
    const value = parseInt(e.target.value);
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
                    <Button
                      onClick={() => setNumPages((prevState) => prevState + 1)}
                    >
                      +
                    </Button>
                    <Input
                      type="text"
                      min="0"
                      value={numPages}
                      onChange={handleNumPagesChange}
                    />
                    <Button
                      onClick={() =>
                        setNumPages((prevState) => Math.max(prevState - 1, 0))
                      }
                    >
                      -
                    </Button>
                  </label>
                  <label>
                    Número de idiomas:
                    <Button
                      onClick={() =>
                        setNumLanguages((prevState) =>
                          Math.max(prevState + 1, 0)
                        )
                      }
                    >
                      +
                    </Button>
                    <Input
                      type="text"
                      min="0"
                      value={numLanguages}
                      onChange={handleNumLanguagesChange}
                    />
                    <Button
                      onClick={() =>
                        setNumLanguages((prevState) =>
                          Math.max(prevState - 1, 0)
                        )
                      }
                    >
                      -
                    </Button>
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
