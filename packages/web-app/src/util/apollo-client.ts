/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-mutable-exports */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import Axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Don't install the types for some reasone it breaks things
import { buildAxiosFetch } from '@lifeomic/axios-fetch';

interface IConnection {
  uri: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}

const awsGraphqlFetch = () => {
  const axiosInstance = Axios.create();

  const interceptor = aws4Interceptor(
    {
      region: 'ap-southeast-1',
      service: 'execute-api',
    },
    {
      accessKeyId: 'ASIA2DP7X6SIEI3YW6EK',
      secretAccessKey: '+zUiPWFOLEL6BshDYdmBI7F9PHI6QnvsAI23Ox7k',
      sessionToken:
        'IQoJb3JpZ2luX2VjEPX//////////wEaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAOHxe/KOYJ1stivk2FM8E2QTpY/NOX2s7gKsfCeLxyPHAiBqKows+uWEces/wCQ5XqwPK1yN6abVNHlWqcWj3kKkjiqhBgie//////////8BEAAaDDY5NDcxMDQzMjkxMiIM1L1fFS+XUNTS4SpjKvUFQOWDegIaKq6vs9kPlxOFfTeGPr/9v16LP84rcMzzH2Qek84Lw9AOXn3wl/Aupz4FXHayCJGOFixrBp0OtFILxPvrwlON2IZbm950v1hqnOYLkTS5KJ/5fMyLjK2G11kiESneiWCg9poyp0WMmXe4ZT/WyNw1KBtsxbSl1gOgra+8MZcYdJ0nmXqglrFTW7kCDYtDhA6yA9jLqpgrcfz1GOHz0d3ezP+l5PFUiN3tHjYFXKq5cyzWe5MkBcajZQm021uemyq3lpoQujvZyILifURazqxnJowLRGkeQQcsPsRoSpnmK53LLnuCdHTpC0NDEVOf8wWEijIEvT+QkH700i6tB0S226b4VdCy9boT7dgM3vkTojA7Y5mYFYyaG46PEKsHru7prOKgNgq5G6BGN7txIAQ4oM8PRnkTiiha0W2/tfVFJk61XPZho+qm96ruLYx0pjDpBoXbW09QamAIMkVLSf/u751D2s4MFdrQF402fcLh6WyA0QmjMt18xRAKLC/OxA9TidKEA+rIf9CLrOV2jZmtrQZ7vdvq2/JKQuglACqMOVioP/zdRalRM15DcAfgYcz7qnkz9FvKIcp2uH2f/CyqKbo7krFVQBUYEPC1MS3kdiMylFqB6Qr0KfjZ0f66iC5OsJY+f2WHQsnChgJlRsSf1gtZ9IPZsuO+dBDGDaQvf8QRWk+bffJz3+Nr/1xAy7WAq9FTDxs2O5W35RKaxcPdyWktG2v+lVNCQ79+71blyDskvq98U9G/nlmWjeRY6kqfqTxX3zjI7CAwHSvc4EV5UTU1W2dhDBWfBjDeIAy9eO6DAnSfOWy/EPG0g4+v7DwGniOr1sR9926sPX+dVfkjRkIDdHrbrRfnbav0HTJwtkrZQ7RyqUkiZ2mYafmkHmt45hYuIbh0v/8oXjp6WZGmkly/yQ/LdfGAJ9fXZLLjxjcNtyy2lgOewxzI2PtLwjHrIym1+sH7Iaimyzww8xAQA90GfxgtHSjkQCa8XpDAcjCjgYb/BTqHAnZIKXaw6yjYhtvyQ5gcQCi/jHWJiLYwtlI+z6OCFoA8HS67HycLoctw4nYmESoSr6l9NZfJA4jvbkG8+5uSt7d9OUqqd5wJQg9RgX0pRfv4YiAdrQAKrKsuuUg8/yT2Vb3K+59mUEqNzQSe/rG1NnMNLIWPKVTrH7FEEtoI2u02HEA/5lrvkFbrhpAxZEQrNTOpJgbdnsC6pVkdNqJAyceIs1cG9GHgIvQpMpceKEqRhm0h1N1w5cnyUFWzuNZPcFJEn8Zm1n25JphaPSbuJqqnw/TsN9hrtEQQSCt87E+ujbgE3qZnhK97rqRbT+RgXHVrcmJoyg22ipn9IIcAWf0oClvpz5SF',
    }
  );
  axiosInstance.interceptors.request.use(interceptor);

  return buildAxiosFetch(axiosInstance);
};

export const initApolloClient = (connection: IConnection): ApolloClient<any> => {
  let apolloClient: ApolloClient<any> = null;

  console.log('Set apollo client');
  apolloClient = new ApolloClient({
    link: createHttpLink({
      uri: connection.uri,
      fetch: awsGraphqlFetch(),
    }),
    cache: new InMemoryCache(),
  });

  return apolloClient;
};
