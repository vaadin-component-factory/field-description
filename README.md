# Component Factory Field Description for Vaadin 14+

This is server-side component of [&lt;vcf-field-description&gt;](https://github.com/vaadin-component-factory/vcf-field-description) Web Component.
Field description is component meant to be used as a HelperComponent.


[Live Demo ↗](https://incubator.app.fi/field-description-demo)

## Usage

Some examples of this component usage:

```java
        FieldDescription fieldDescription1 = new FieldDescription();
        fieldDescription1.setDescription("This is a short description");
        fieldDescription1.setReadMoreFocusable(true);
        fieldDescription1.setFeedback("Some feedback huh ?", IFieldDescription.FeedbackState.INFO);

        TextField textField1 = new TextField();
        textField1.setLabel("Short description:");
        textField1.setHelperComponent(fieldDescription1);
        textField1.setWidth("400px");

        FieldDescription fieldDescription2 = new FieldDescription();
        fieldDescription2.setDescription("This is a very long description and also I decreased the width of the textfield. The idea here is to check if the styles will be applied and also if I'm able to expand the description box.");
        fieldDescription2.setReserveDescriptionHeight(true);
        fieldDescription2.setReserveFeedbackHeight(true);
        fieldDescription2.setFeedback("Some feedback huh ?", IFieldDescription.FeedbackState.WARN);

        TextField textField2 = new TextField();
        textField2.setLabel("Long description:");
        textField2.setHelperComponent(fieldDescription2);
        textField2.setWidth("250px");

        FieldDescription fieldDescription3 = new FieldDescription();
        fieldDescription3.setDescriptionAsHtml("<span style=\"color:blue\">TEST!</span>");

        TextField textField3 = new TextField();
        textField3.setLabel("Description as html:");
        textField3.setHelperComponent(fieldDescription3);
        textField3.setWidth("400px");

        add(textField1, textField2, textField3);

        Button button = new Button("update desc to check if it updates");
        button.addClickListener(buttonClickEvent -> fieldDescription1.setDescription("dfalvjare akerjhg erlkge rlkgrgserg ersgesr gser gedrgdr gdrg rd  drgdrgdrge rioguweçrghrwthgrthgkrjhg rgrtgk rtgrtilgurt"));

        add(button);

```

## Setting up for development:

Clone the project in GitHub (or fork it if you plan on contributing)

```
git clone git@github.com:vaadin-component-factory/field-description.git
```

to install project, to your maven repository run

```mvn install```


## How to run the demo?

The Demo can be run going to the project `field-description-demo` and executing the maven goal:

```mvn spring-boot:run```


# License & Author

Apache License 2