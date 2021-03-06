package org.vaadin.addons.componentfactory;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("")
public class TestView extends VerticalLayout {
    public TestView() {
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
        button.addClickListener(buttonClickEvent -> fieldDescription1.setDescription("dfalvjare akerjhg erlkge rlkgrgserg ersgesr gser gedrgdr gdrg rd  drgdrgdrge rioguwe??rghrwthgrthgkrjhg rgrtgk rtgrtilgurt"));

        add(button);
    }
}
