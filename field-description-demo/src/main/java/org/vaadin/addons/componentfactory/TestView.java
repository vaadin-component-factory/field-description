package org.vaadin.addons.componentfactory;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("")
public class TestView extends VerticalLayout {
    public TestView() {
        FieldDescription fieldDescription1 = new FieldDescription();
        fieldDescription1.setDescription("This is a short description");

        TextField textField1 = new TextField();
        textField1.setLabel("Short description:");
        textField1.setHelperComponent(fieldDescription1);
        textField1.setWidth("400px");

        FieldDescription fieldDescription2 = new FieldDescription();
        fieldDescription2.setDescription("This is a very long description and also I decreased the width of the textfield. The idea here is to check if the styles will be applied and also if I'm able to expand the description box.");

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
    }
}
