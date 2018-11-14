import React from 'react';
import { Grid, Image, Header, Icon, Divider, Container, Button, Segment } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '150px' };
    return (
        <div>
          <div className = "landing-background">
            <Grid container verticalAlign='middle' centered rows={2}>
              <Grid.Row>
                  <Container>
                    <div className = "landing-header">
                      <p>Helping Students Connect with Companies. Jobs In A Jiffy!</p>
                    </div>
                  </Container>
              </Grid.Row>
              <Grid.Row>
                  <div>
                    <Header size="huge" as='h2' icon textAlign='center'>
                      <div className = "landing-text">
                        Join the Jiffy Jobs community!
                      </div>
                    </Header>
                    <Segment padded>
                      <Button primary fluid>
                        Login
                      </Button>
                      <Divider horizontal>Or</Divider>
                      <Button secondary fluid>
                        Sign Up Now
                      </Button>
                    </Segment>
                  </div>
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <footer>
              <div style={divStyle} className="ui center aligned container">
                <Grid container verticalAlign='middle' centered columns={2}>
                  <Grid.Column>
                    <div className = "landing-text-dark">
                      <h2 className = "landing-text-dark">Find job opportunities that fit your skill-set</h2>
                      <p>Jiffy Jobs' interactive environment allows students find potential employers
                      and helps employers hire students!</p>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <Image src="/images/computerman.jpg" rounded size="medium"/>
                    <a href="https://www.freepik.com/free-photos-vectors/business">Business vector created by Freepik</a>
                  </Grid.Column>
                </Grid>
              </div>
            </footer>
          </div>
        </div>

    );
  }
}

export default Landing;
