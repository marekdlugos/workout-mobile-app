package exam01;

import com.google.common.collect.ImmutableSet;

interface SetExpression {

}

class StringSet implements SetExpression {
    protected final ImmutableSet<String> set;

    public StringSet(ImmutableSet<String> set) {
        this.set = set;
    }
}


class VarSet implements SetExpression {
    protected final String name;

    VarSet(String name) {
        this.name = name;
    }
}

class Remove implements SetExpression {
    protected final SetExpression sub;
    protected String element;

    Remove(SetExpression sub, String element) {
        this.sub = sub;
        this.element = element;
    }
}

class Union implements SetExpression {
    protected final SetExpression left;
    protected final SetExpression right;

    Union(SetExpression right, SetExpression left) {
        this.right = right;
        this.left = left;
    }
}

class Intersection implements SetExpression {
    protected final SetExpression left;
    protected final SetExpression right;

    Intersection(SetExpression right, SetExpression left) {
        this.right = right;
        this.left = left;
    }
}

public class Exam01 {
    public static void main(String[] args) {

    }
}
