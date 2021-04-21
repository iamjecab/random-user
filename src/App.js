import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
    FaEnvelopeOpen,
    FaUser,
    FaCalendarTimes,
    FaMap,
    FaPhone,
    FaLock,
} from "react-icons/fa";

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }
  body{
    font-family: 'Roboto', sans-serif;
  }
  
`;

const url = `https://randomuser.me/api/`;

const App = () => {
    const [data, setData] = useState({});
    const [value, setValue] = useState(`Name`);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(url);
            const personData = await res.json();
            const {
                cell,
                email,
                location,
                login,
                name,
                dob,
                picture,
            } = personData.results[0];
            const { street } = location;
            const { age } = dob;
            const { large: img } = picture;
            const { number: streetNumber, name: streetName } = street;
            const address = `${streetNumber} ${streetName}`;
            const { first, last } = name;
            const { password } = login;
            const Name = `${first} ${last}`;
            setData({
                cell,
                email,
                age,
                address,
                password,
                Name,
                img,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const hoverHandler = (e) => {
        if (e.target.dataset.label) {
            setValue(`${e.target.dataset.label}`);
        }
    };

    return (
        <>
            <GlobalStyles />
            <Container>
                {loading ? (
                    <Loading> Loading .... </Loading>
                ) : (
                    <Card>
                        <ImgContainer>
                            <Img src={data.img}></Img>
                        </ImgContainer>
                        <InfoContainer>
                            <Message>{`my ${value} is`}</Message>
                            <PersonData>{data[value]}</PersonData>
                            <ToggleBtnContainer>
                                <UserBtn
                                    data-label="Name"
                                    onMouseOver={hoverHandler}
                                />

                                <MailBtn
                                    data-label="email"
                                    onMouseOver={hoverHandler}
                                />
                                <AgeBtn
                                    data-label="age"
                                    onMouseOver={hoverHandler}
                                />
                                <MapBtn
                                    data-label="address"
                                    onMouseOver={hoverHandler}
                                />
                                <CellBtn
                                    data-label="cell"
                                    onMouseOver={hoverHandler}
                                />
                                <PasswordBtn
                                    data-label="password"
                                    onMouseOver={hoverHandler}
                                />
                            </ToggleBtnContainer>
                        </InfoContainer>
                        <BtnContainer>
                            <ChangeBtn onClick={fetchData}>
                                Random User
                            </ChangeBtn>
                        </BtnContainer>
                    </Card>
                )}
            </Container>
        </>
    );
};

const Container = styled.main`
    height: 100vh;
    background: linear-gradient(#2c2e31 50%, white 50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = styled.h1`
    color: #49a6e6;
    margin-bottom: 2rem;
`;

const Card = styled.div`
    background-color: white;
    box-shadow: 0 5px 15px black;
    max-width: 95%;
`;

const ImgContainer = styled.div`
    width: auto;
    display: flex;
    justify-content: center;
`;

const Img = styled.img`
    width: 50%;
    border-radius: 50%;
    box-shadow: 5px 5px 10px gray;
    margin: 1.4rem;
`;

const InfoContainer = styled.section`
    text-align: center;
    color: #102a42;
`;

const Message = styled.h3`
    font-weight: 400;
    margin: 0.8rem 0;
    text-transform: capitalize;
`;

const PersonData = styled.h1`
    font-size: 1.2rem;
    margin: 1.4rem 0;
    @media (min-width: 300px) {
        font-size: 1.5rem;
    }
`;

const ToggleBtnContainer = styled.div`
    font-size: 2rem;
    svg {
        cursor: pointer;
        margin: 1rem 1rem;
        &:hover {
            color: #617d98;
        }
    }
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const UserBtn = styled(FaUser)``;

const MailBtn = styled(FaEnvelopeOpen)``;

const AgeBtn = styled(FaCalendarTimes)``;

const MapBtn = styled(FaMap)``;

const CellBtn = styled(FaPhone)``;

const PasswordBtn = styled(FaLock)``;

const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
`;

const ChangeBtn = styled.button`
    font-size: 1.2rem;
    background-color: #49a6e6;
    border: none;
    font-weight: 600;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #063251;
    }
`;

export default App;
