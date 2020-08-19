import React from 'react';
import { Container, Row, Col, Media, ListGroup } from 'react-bootstrap'
import question from './question.png';

function Tips() {
  return (
    <div className="page">
      <Media>
        <img
          width={150}
          height={150}
          src={question}
          className="mr-3"
          alt="logo" />
      </Media>
      <h2>What to do if you have no electricity for a few days?</h2>
      <Container>


        <Row xs={1} md={2}>
          <Col><article>
            <h3>Water</h3>
            <p>Your family needs at least one gallon of water per person, per day, to function
            during an emergency. You’ll also need extra water for pets, cooking, and hygiene.
            If you’re preparing for a two-week emergency, that comes to 56-112 gallons or more of water.
            Many people don’t have the space to store that much water, and at $1 per gallon, on average,
            that’s a big investment.

            It’s smart to have a least a week’s worth of water on hand. However, you can look at other
            ways to get water during an emergency. For example, is there a lake, river, or stream nearby
            that you could use as a water source? Could you collect rain from the roof? You might also want
            to look at ways to purify water during an emergency, especially if you’ll be sourcing it from
       nature. Water purification tablets, bleach, and heat are all economical ways to purify water. </p>
            <h3>Food</h3>
            <p>If the power goes out for an extended period of time, store shelves will be emptied
            within hours and they might not be restocked for a while. This is why having a long-term food
       pantry is so important. </p>
            <ListGroup>
              <ListGroup.Item>Crackers</ListGroup.Item>
              <ListGroup.Item>Powdered milk</ListGroup.Item>
              <ListGroup.Item>Pasta</ListGroup.Item>
              <ListGroup.Item>Canned vegetables, especially canned beans</ListGroup.Item>
              <ListGroup.Item>Oatmeal</ListGroup.Item>
              <ListGroup.Item>Rice</ListGroup.Item>
              <ListGroup.Item>Beef or chicken bouillon</ListGroup.Item>
              <ListGroup.Item>Dried fruit</ListGroup.Item>
              <ListGroup.Item>Instant coffee and tea</ListGroup.Item>
              <ListGroup.Item>Comfort foods, such as cookies and chocolate</ListGroup.Item>
              <ListGroup.Item>Manual can opener</ListGroup.Item>
            </ListGroup>
            <h3>Cooking</h3>
            <p>If your home has a fireplace, fire pit, or wood stove, you already have an easy way
            to cook hot meals for your family. Make sure you keep an emergency supply of firewood
            and kindling on hand so that you can quickly light a fire if the lights go out.
      Store as much as you can so you’re prepared for a long-term outage.</p>
            <h3>Lighting and Communications</h3>
            <p>You also need to look at how you’re going to illuminate your home when the lights go out.
            Candles are an inexpensive choice, but keep in mind that they can be dangerous, especially
       if you have children in the house. Some better lighting options include:</p>
            <ListGroup>
              <ListGroup.Item>Flashlights</ListGroup.Item>
              <ListGroup.Item>Headlamps</ListGroup.Item>
              <ListGroup.Item>LED or solar-powered lanterns</ListGroup.Item>
            </ListGroup>

          </article></Col>


          <Col><article>
            <h3>Bathing & Cleaning</h3>
            <p>Bathing is going to be another issue when the water stops flowing. While we don’t need
            to shower every day, we do need to keep clean. This goes for our homes as well: Keeping
            plates and cooking equipment clean lowers the spread of germs, disease, and illness. This
       is why it’s important to have the following supplies on hand:</p>
            <ListGroup>
              <ListGroup.Item>Baby wipes</ListGroup.Item>
              <ListGroup.Item>Hand sanitizer</ListGroup.Item>
              <ListGroup.Item>Disposable utensils</ListGroup.Item>
              <ListGroup.Item>Disinfectant cleanser, such as bleach or Lysol</ListGroup.Item>
              <ListGroup.Item>Paper towels</ListGroup.Item>
              <ListGroup.Item>Feminine hygiene products</ListGroup.Item>
              <ListGroup.Item>Diapers</ListGroup.Item>
            </ListGroup>
            <h3>Sanitation</h3>
            <p>If you’re on a septic system, you’ll still be able to flush your toilet if you have
            water to put in the tank. Simply pour water into the toilet tank until it touches the
            float and then flush. Or, you can pour water quickly and forcefully into the bowl itself,
       which causes the water to siphon and flush on its own.</p>
            <p>However, if your area has experienced a great deal of rain or flooding, it’s not a good
            idea to use your septic system. If the water table is too high, your septic will not work
            and waste will quickly spill out into your yard, causing a serious health hazard. If you have
            a yard, you can also dispose of waste by digging holes in the ground that are six to eight
            inches deep. Make sure each hole is at least 200 feet from any water source, and try to dig
        holes in sunny spots; the sun will aid decomposition.</p>
            <h3>Health & welness</h3>
            <p>A long-term power outage means you likely won’t have access to the medicines you
            and your family might need to stay healthy. One way to prepare for this, and cut costs,
            is to learn to rely on natural remedies to keep your family healthy. For example, elderberry
            syrup is an incredibly effective immune booster and can help you and your kids recover
            from illness faster. You can purchase elderberries inexpensively online and make your
         own elderberry syrup to have on hand.</p>
            <h3>Final Word</h3>
            <p> It’s not pleasant to think about living without power for days or weeks at a time.
            However, the reality is that we’re completely dependent on living with electricity, and
            our grid is vulnerable. Doing what you can to prepare now will give you peace of mind and
            help ensure that you and your family get through such an emergency, should it ever happen.
       <br />
       Do you have any emergency supplies put away for a long-term power outage? How else
        have you prepared your family to get through an emergency?
      </p>

          </article></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Tips;
