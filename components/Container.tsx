/**
 * Used to set the max width and centre content
 * Also allows for children to go full-width with a class when required
 */

 import React, { ReactElement, ReactNode } from 'react';
 import styled from 'styled-components';
 
 const StyledContainer = styled.div`
   /* Utilise the "full-bleed" grid layout from https://www.joshwcomeau.com/css/full-bleed/ */
   display: grid;
   grid-template-columns:
     1fr min(var(--max-width), calc(100% - (2 * var(--inset-from-edge))))
     1fr;
   > * {
     grid-column: 2;
     background-color: inherit;
     padding-left: 20px;
     padding-right: 20px;
 
     @media (max-width: 600px) {
       padding-left: 15px;
       padding-right: 15px;
     }
 
     @media (max-width: 375px) {
       padding-left: 5px;
       padding-right: 5px;
     }
   }
   > .full-bleed {
     grid-column: 1 / -1;
     padding-left: 0;
     padding-right: 0;
   }
 `;
 
 export function Container({
   children,
   as = 'div',
   ...props
 }: {
   children: ReactNode;
   as?: string;
 } & Record<string, any>): ReactElement {
   return (
     <StyledContainer as={as as string | React.ComponentType<any>} {...props}>
       {children}
     </StyledContainer>
   );
 }
 