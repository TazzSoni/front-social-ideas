import { Grid } from "@mui/material";
import styled from "styled-components";

import { VContainer } from "../../components/containers";

export const DashboardContainer = styled(VContainer)`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const GridItem = styled(Grid)`
  width: 24vw,
  height: 60vh,
`;
