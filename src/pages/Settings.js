// src/pages/Settings.js
import React from 'react';
import styled from 'styled-components';

const Settings = () => {
    return (
        <Container>
            <Section>
                <h3>notifications</h3>
                <p>manage notifications</p>
                <button>edit</button>
            </Section>

            <Section>
                <h3>preferences</h3>
                <p>edit account preferences</p>
                <button>edit</button>
            </Section>

            <Section>
                <h3>privacy</h3>
                <p>manage privacy settings</p>
                <button>edit</button>
            </Section>
        </Container>
    );
};

const Container = styled.div`
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }

  button {
    background-color: #00d2ff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
`;

export default Settings;
