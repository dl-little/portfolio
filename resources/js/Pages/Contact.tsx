import Heading from "@/Components/Heading";
import styled from "styled-components";

import variables from "../../scss/abstracts/_shared.module.scss";
const { halfGap, gap, largeGap, contrast, secondary, tabletBreak, quarterGap } =
    variables;

interface IContact {
    values: {
        github_url: string;
        linkedin_url: string;
        email: string;
    };
}

const ContactContainer = styled.section`
    & > *:not(:first-child) {
        margin-block-start: ${gap};
    }
`;

const SettingCards = styled.ul`
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;

    & > *:not(:first-child) {
        margin-block-start: ${largeGap};
        @media (min-width: ${tabletBreak}) {
            margin-block-start: ${gap};
        }
    }
`;

const SettingCard = styled.li`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    justify-content: flex-end;
    gap: ${quarterGap};
    @media (min-width: ${tabletBreak}) {
        gap: ${halfGap};
    }

    & big {
        color: ${contrast};
    }
`;

const Contact: React.FC<IContact> = ({ values }) => {
    const { github_url, linkedin_url, email } = values;

    return (
        <ContactContainer>
            <Heading>Contact</Heading>
            <SettingCards>
                <SettingCard>
                    <big>
                        <a className="inertia-link" href={github_url}>
                            Github Url
                        </a>
                    </big>
                </SettingCard>
                <SettingCard>
                    <big>
                        <a className="inertia-link" href={linkedin_url}>
                            LinkedIn Url
                        </a>
                    </big>
                </SettingCard>
                <SettingCard>
                    <big>
                        <a className="inertia-link" href={`mailto:${email}`}>
                            Email
                        </a>
                    </big>
                </SettingCard>
            </SettingCards>
        </ContactContainer>
    );
};

export default Contact;
