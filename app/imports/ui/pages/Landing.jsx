import React from 'react';
import { Grid, Image, Header, Icon, Divider, Container, Button, Segment, Menu } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import TopMenu from '../components/TopMenu';
import { Dropdown } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { NavLink } from 'react-router-dom';

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
                      <Button primary fluid as={NavLink} exact to="/signin">
                        Login
                      </Button>
                      <Divider horizontal>Or</Divider>
                      <Button secondary fluid as={NavLink} exact to="/signup">
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
                <Grid container verticalAlign='middle' centered columns={2} rows={3}>
                  <Grid.Row>
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
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <Image src="/images/computer.jpg" rounded size="medium"/>
                      <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by Makyzz - Freepik.com</a>
                    </Grid.Column>
                    <Grid.Column>
                      <div className = "landing-text-dark">
                        <h2 className = "landing-text-dark">Discover and connect with companies in your area.</h2>
                        <p>Our interface displays local companies in an easy to read, easy to access manner.
                          Local companies can discover students that suit job positions.</p>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Divider/>
                  <Grid.Row>
                    <Grid.Column>
                      <div className = "landing-text-dark">
                        <h2 className = "landing-text-dark">Rate companies and show off your Jiffy Score!</h2>
                        <p>Our interface displays local companies in an easy to read, easy to access manner.
                          Local companies can discover students that suit job positions.</p>
                      </div>
                    </Grid.Column>
                    <Grid.Column>
                      <Image src="/images/rating.jpg" rounded size="medium"/>
                      <a href="https://www.freepik.com/free-vector/positive-and-negative-rating-design_1064362.htm">Designed by Photoroyalty</a>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </footer>
          </div>
        </div>

    );
  }
}

export default Landing;
