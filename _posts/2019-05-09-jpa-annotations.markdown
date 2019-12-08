---
layout: post
title:  "JPA annotations"
date:   2019-05-09 12:46:56
categories: Java
description: JPA annotations
keywords: [Andrei Pall, blog, freebsd, linux, framework]
excerpt: The Java Persistence API (JPA) is a Java application programming interface specification that describes the management of relational data in applications using Java Platform, Standard Edition and Java Platform, Enterprise Edition. This article provides you with 89 JPA mapping annotations for quick reference and/or summary. Let's get started!
---
The Java Persistence API (JPA) is a Java application programming interface specification that describes the management of relational data in applications using Java Platform, Standard Edition and Java Platform, Enterprise Edition. This article provides you with 89 JPA mapping annotations for quick reference and/or summary. Let's get started!
<div class="sect2">
<h3 id="annotations-jpa"><a class="anchor" href="#annotations-jpa"></a> JPA annotations</h3>
<div class="sect3">
<h4 id="annotations-jpa-access"><a class="anchor" href="#annotations-jpa-access"></a>1. <code>@Access</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Access.html"><code>@Access</code></a> annotation is used to specify the access type of the associated entity class, mapped superclass, or embeddable class, or entity attribute.</p>
</div>
<div class="paragraph">
<p>See the <a href="#access">Access type</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-associationoverride"><a class="anchor" href="#annotations-jpa-associationoverride"></a>2. <code>@AssociationOverride</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AssociationOverride.html"><code>@AssociationOverride</code></a> annotation is used to override an association mapping (e.g. <code>@ManyToOne</code>, <code>@OneToOne</code>, <code>@OneToMany</code>, <code>@ManyToMany</code>) inherited from a mapped superclass or an embeddable.</p>
</div>
<div class="paragraph">
<p>See the <a href="#embeddable-override">Overriding Embeddable types</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-associationoverrides"><a class="anchor" href="#annotations-jpa-associationoverrides"></a>3. <code>@AssociationOverrides</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AssociationOverrides.html"><code>@AssociationOverrides</code></a> is used to group several <a href="#annotations-jpa-associationoverride"><code>@AssociationOverride</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-attributeoverride"><a class="anchor" href="#annotations-jpa-attributeoverride"></a>4. <code>@AttributeOverride</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AttributeOverride.html"><code>@AttributeOverride</code></a> annotation is used to override an attribute mapping inherited from a mapped superclass or an embeddable.</p>
</div>
<div class="paragraph">
<p>See the <a href="#embeddable-override">Overriding Embeddable types</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-attributeoverrides"><a class="anchor" href="#annotations-jpa-attributeoverrides"></a>5. <code>@AttributeOverrides</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AttributeOverrides.html"><code>@AttributeOverrides</code></a> is used to group several <a href="#annotations-jpa-attributeoverride"><code>@AttributeOverride</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-basic"><a class="anchor" href="#annotations-jpa-basic"></a>6. <code>@Basic</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Basic.html"><code>@Basic</code></a> annotation is used to map a basic attribute type to a database column.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic">Basic types</a> chapter for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-cacheable"><a class="anchor" href="#annotations-jpa-cacheable"></a>7. <code>@Cacheable</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Cacheable.html"><code>@Cacheable</code></a> annotation is used to specify whether an entity should be stored in the second-level cache.</p>
</div>
<div class="paragraph">
<p>If the <code>persistence.xml</code> <code>shared-cache-mode</code> XML attribute is set to <code>ENABLE_SELECTIVE</code>, then only the entities annotated with the <code>@Cacheable</code> are going to be stored in the second-level cache.</p>
</div>
<div class="paragraph">
<p>If <code>shared-cache-mode</code> XML attribute value is <code>DISABLE_SELECTIVE</code>, then the entities marked with the <code>@Cacheable</code> annotation are not going to be stored in the second-level cache, while all the other entities are stored in the cache.</p>
</div>
<div class="paragraph">
<p>See the <a href="#caching">Caching</a> chapter for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-collectiontable"><a class="anchor" href="#annotations-jpa-collectiontable"></a>8. <code>@CollectionTable</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/CollectionTable.html"><code>@CollectionTable</code></a> annotation is used to specify the database table that stores the values of a basic or an embeddable type collection.</p>
</div>
<div class="paragraph">
<p>See the <a href="#embeddable-collections">Collections of embeddable types</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-column"><a class="anchor" href="#annotations-jpa-column"></a>9. <code>@Column</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Column.html"><code>@Column</code></a> annotation is used to specify the mapping between a basic entity attribute and the database table column.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-column-annotation"><code>@Column</code> annotation</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-columnresult"><a class="anchor" href="#annotations-jpa-columnresult"></a>10. <code>@ColumnResult</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ColumnResult.html"><code>@ColumnResult</code></a> annotation is used in conjunction with the <a href="#annotations-jpa-sqlresultsetmapping"><code>@SqlResultSetMapping</code></a> or <a href="#annotations-jpa-constructorresult"><code>@ConstructorResult</code></a> annotations to map a SQL column for a given SELECT query.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-composite-key-entity-associations_named-query-example">Entity associations with named native queries</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-constructorresult"><a class="anchor" href="#annotations-jpa-constructorresult"></a>11. <code>@ConstructorResult</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ConstructorResult.html"><code>@ConstructorResult</code></a> annotation is used in conjunction with the <a href="#annotations-jpa-sqlresultsetmapping"><code>@SqlResultSetMapping</code></a> annotations to map columns of a given SELECT query to a certain object constructor.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-multiple-scalar-values-dto-NamedNativeQuery-example">Multiple scalar values <code>NamedNativeQuery</code> with <code>ConstructorResult</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-convert"><a class="anchor" href="#annotations-jpa-convert"></a>12. <code>@Convert</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Convert.html"><code>@Convert</code></a> annotation is used to specify the <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AttributeConverter.html"><code>AttributeConverter</code></a> implementation used to convert the currently annotated basic attribute.</p>
</div>
<div class="paragraph">
<p>If the <code>AttributeConverter</code> uses <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Converter.html#autoApply--"><code>autoApply</code></a>, then all entity attributes with the same target type are going to be converted automatically.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-enums-attribute-converter"><code>AttributeConverter</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-converter"><a class="anchor" href="#annotations-jpa-converter"></a>13. <code>@Converter</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Converter.html"><code>@Converter</code></a> annotation is used to specify that the current annotate <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/AttributeConverter.html"><code>AttributeConverter</code></a> implementation can be used as a JPA basic attribute converter.</p>
</div>
<div class="paragraph">
<p>If the <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Converter.html#autoApply--"><code>autoApply</code></a> attribute is set to <code>true</code>, then the JPA provider will automatically convert all basic attributes with the same Java type as defined by the current converter.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-enums-attribute-converter"><code>AttributeConverter</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-converts"><a class="anchor" href="#annotations-jpa-converts"></a>14. <code>@Converts</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Converts.html"><code>@Converts</code></a> annotation is used to group multiple <a href="#annotations-jpa-convert"><code>@Convert</code></a> annotations.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-enums-attribute-converter"><code>AttributeConverter</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-discriminatorcolumn"><a class="anchor" href="#annotations-jpa-discriminatorcolumn"></a>15. <code>@DiscriminatorColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/DiscriminatorColumn.html"><code>@DiscriminatorColumn</code></a> annotation is used to specify the discriminator column name and the <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/DiscriminatorColumn.html#discriminatorType--">discriminator type</a> for the <code>SINGLE_TABLE</code> and <code>JOINED</code> Inheritance strategies.</p>
</div>
<div class="paragraph">
<p>See the <a href="#entity-inheritance-discriminator">Discriminator</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-discriminatorvalue"><a class="anchor" href="#annotations-jpa-discriminatorvalue"></a>16. <code>@DiscriminatorValue</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/DiscriminatorValue.html"><code>@DiscriminatorValue</code></a> annotation is used to specify what value of the discriminator column is used for mapping the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#entity-inheritance-discriminator">Discriminator</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-elementcollection"><a class="anchor" href="#annotations-jpa-elementcollection"></a>17. <code>@ElementCollection</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ElementCollection.html"><code>@ElementCollection</code></a> annotation is used to specify a collection of a basic or embeddable types.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections">Collections</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-embeddable"><a class="anchor" href="#annotations-jpa-embeddable"></a>18. <code>@Embeddable</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Embeddable.html"><code>@Embeddable</code></a> annotation is used to specify embeddable types. Like basic types, embeddable types do not have any identity, being managed by their owning entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#embeddables">Embeddables</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-embedded"><a class="anchor" href="#annotations-jpa-embedded"></a>19. <code>@Embedded</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Embedded.html"><code>@Embedded</code></a> annotation is used to specify that a given entity attribute represents an embeddable type.</p>
</div>
<div class="paragraph">
<p>See the <a href="#embeddables">Embeddables</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-embeddedid"><a class="anchor" href="#annotations-jpa-embeddedid"></a>20. <code>@EmbeddedId</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/EmbeddedId.html"><code>@EmbeddedId</code></a> annotation is used to specify the entity identifier is an embeddable type.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-composite-aggregated">Composite identifiers with <code>@EmbeddedId</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-entity"><a class="anchor" href="#annotations-jpa-entity"></a>21. <code>@Entity</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Entity.html"><code>@Entity</code></a> annotation is used to specify that the currently annotate class represents an entity type.
Unlike basic and embeddable types, entity types have an identity and their state is managed by the underlying Persistence Context.</p>
</div>
<div class="paragraph">
<p>See the <a href="#entity">Entity</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-entitylisteners"><a class="anchor" href="#annotations-jpa-entitylisteners"></a>22. <code>@EntityListeners</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/EntityListeners.html"><code>@EntityListeners</code></a> annotation is used to specify an array of callback listener classes that are used by the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-entityresult"><a class="anchor" href="#annotations-jpa-entityresult"></a>23. <code>@EntityResult</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/EntityResult.html"><code>@EntityResult</code></a> annotation is used with the <a href="#annotations-jpa-sqlresultsetmapping"><code>@SqlResultSetMapping</code></a> annotation to map the selected columns to an entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-composite-key-entity-associations_named-query-example">Entity associations with named native queries</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-enumerated"><a class="anchor" href="#annotations-jpa-enumerated"></a>24. <code>@Enumerated</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Enumerated.html"><code>@Enumerated</code></a> annotation is used to specify that an entity attribute represents an enumerated type.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-enums-Enumerated"><code>@Enumerated</code> basic type</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-excludedefaultlisteners"><a class="anchor" href="#annotations-jpa-excludedefaultlisteners"></a>25. <code>@ExcludeDefaultListeners</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ExcludeDefaultListeners.html"><code>@ExcludeDefaultListeners</code></a> annotation is used to specify that the currently annotated entity skips the invocation of any default listener.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-exclude-default-listener">Exclude default entity listeners</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-excludesuperclasslisteners"><a class="anchor" href="#annotations-jpa-excludesuperclasslisteners"></a>26. <code>@ExcludeSuperclassListeners</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ExcludeSuperclassListeners.html"><code>@ExcludeSuperclassListeners</code></a>  annotation is used to specify that the currently annotated entity skips the invocation of listeners declared by its superclass.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-exclude-default-listener">Exclude default entity listeners</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-fieldresult"><a class="anchor" href="#annotations-jpa-fieldresult"></a>27. <code>@FieldResult</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/FieldResult.html"><code>@FieldResult</code></a> annotation is used with the <a href="#annotations-jpa-entityresult"><code>@EntityResult</code></a> annotation to map the selected columns to the fields of some specific entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-composite-key-entity-associations_named-query-example">Entity associations with named native queries</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-foreignkey"><a class="anchor" href="#annotations-jpa-foreignkey"></a>28. <code>@ForeignKey</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ForeignKey.html"><code>@ForeignKey</code></a> annotation is used to specify the associated foreign key of a <a href="#annotations-jpa-joincolumn"><code>@JoinColumn</code></a> mapping.
The <code>@ForeignKey</code> annotation is only used if the automated schema generation tool is enabled, in which case, it allows you to customize the underlying foreign key definition.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-many-to-one-example"><code>@ManyToOne</code> with <code>@ForeignKey</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-generatedvalue"><a class="anchor" href="#annotations-jpa-generatedvalue"></a>29. <code>@GeneratedValue</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/GeneratedValue.html"><code>@GeneratedValue</code></a> annotation specifies that the entity identifier value is automatically generated using an identity column, a database sequence, or a table generator.
Hibernate supports the <code>@GeneratedValue</code> mapping even for <code>UUID</code> identifiers.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-simple-generated">Automatically-generated identifiers</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-id"><a class="anchor" href="#annotations-jpa-id"></a>30. <code>@Id</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Id.html"><code>@Id</code></a> annotation specifies the entity identifier.
An entity must always have an identifier attribute which is used when loading the entity in a given Persistence Context.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers">Identifiers</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-idclass"><a class="anchor" href="#annotations-jpa-idclass"></a>31. <code>@IdClass</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/IdClass.html"><code>@IdClass</code></a> annotation is used if the current entity defined a composite identifier.
A separate class encapsulates all the identifier attributes, which are mirrored by the current entity mapping.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-composite-nonaggregated">Composite identifiers with <code>@IdClass</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-index"><a class="anchor" href="#annotations-jpa-index"></a>32. <code>@Index</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Index.html"><code>@Index</code></a> annotation is used by the automated schema generation tool to create a database index.</p>
</div>
<div class="paragraph">
<p>See the <a href="#schema-generation-columns-index">Columns index</a> chapter for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-inheritance"><a class="anchor" href="#annotations-jpa-inheritance"></a>33. <code>@Inheritance</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Inheritance.html"><code>@Inheritance</code></a> annotation is used to specify the inheritance strategy of a given entity class hierarchy.</p>
</div>
<div class="paragraph">
<p>See the <a href="#entity-inheritance">Inheritance</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-joincolumn"><a class="anchor" href="#annotations-jpa-joincolumn"></a>34. <code>@JoinColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/JoinColumn.html"><code>@JoinColumn</code></a> annotation is used to specify the FOREIGN KEY column used when joining an entity association or an embeddable collection.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-many-to-one-example"><code>@ManyToOne</code> with <code>@JoinColumn</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-joincolumns"><a class="anchor" href="#annotations-jpa-joincolumns"></a>35. <code>@JoinColumns</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/JoinColumns.html"><code>@JoinColumns</code></a> annotation is used to group multiple <a href="#annotations-jpa-joincolumn"><code>@JoinColumn</code></a> annotations, which are used when mapping entity association or an embeddable collection using a composite identifier</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-jointable"><a class="anchor" href="#annotations-jpa-jointable"></a>36. <code>@JoinTable</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/JoinTable.html"><code>@JoinTable</code></a> annotation is used to specify the link table between two other database tables.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-unidirectional-example"><code>@JoinTable</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-lob"><a class="anchor" href="#annotations-jpa-lob"></a>37. <code>@Lob</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Lob.html"><code>@Lob</code></a> annotation is used to specify that the currently annotated entity attribute represents a large object type.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-blob-example"><code>BLOB</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-manytomany"><a class="anchor" href="#annotations-jpa-manytomany"></a>38. <code>@ManyToMany</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ManyToMany.html"><code>@ManyToMany</code></a> annotation is used to specify a many-to-many database relationship.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-many-to-many"><code>@ManyToMany</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-manytoone"><a class="anchor" href="#annotations-jpa-manytoone"></a>39. <code>@ManyToOne</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/ManyToOne.html"><code>@ManyToOne</code></a> annotation is used to specify a many-to-one database relationship.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-many-to-one"><code>@ManyToOne</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkey"><a class="anchor" href="#annotations-jpa-mapkey"></a>40. <code>@MapKey</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKey.html"><code>@MapKey</code></a> annotation is used to specify the key of a <code>java.util.Map</code> association for which the key type is either the primary key or an attribute of the entity which represents the value of the map.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-unidirectional-example"><code>@MapKey</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeyclass"><a class="anchor" href="#annotations-jpa-mapkeyclass"></a>41. <code>@MapKeyClass</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyClass.html"><code>@MapKeyClass</code></a> annotation is used to specify the type of the map key of a <code>java.util.Map</code> associations.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-key-class"><code>@MapKeyClass</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeycolumn"><a class="anchor" href="#annotations-jpa-mapkeycolumn"></a>42. <code>@MapKeyColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyColumn.html"><code>@MapKeyColumn</code></a> annotation is used to specify the database column which stores the key of a <code>java.util.Map</code> association for which the map key is a basic type.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-custom-key-type-mapping-example"><code>@MapKeyType</code> mapping section</a> for an example of <code>@MapKeyColumn</code> annotation usage.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeyenumerated"><a class="anchor" href="#annotations-jpa-mapkeyenumerated"></a>43. <code>@MapKeyEnumerated</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyEnumerated.html"><code>@MapKeyEnumerated</code></a> annotation is used to specify that the key of <code>java.util.Map</code> association is a Java Enum.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-bidirectional-example"><code>@MapKeyEnumerated</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeyjoincolumn"><a class="anchor" href="#annotations-jpa-mapkeyjoincolumn"></a>44. <code>@MapKeyJoinColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyJoinColumn.html"><code>@MapKeyJoinColumn</code></a> annotation is used to specify that the key of <code>java.util.Map</code> association is an entity association.
The map key column is a FOREIGN KEY in a link table that also joins the <code>Map</code> owner’s table with the table where the <code>Map</code> value resides.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-value-type-entity-key-example"><code>@MapKeyJoinColumn</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeyjoincolumns"><a class="anchor" href="#annotations-jpa-mapkeyjoincolumns"></a>45. <code>@MapKeyJoinColumns</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyJoinColumns.html"><code>@MapKeyJoinColumns</code></a> annotation is used to group several <a href="#annotations-jpa-mapkeyjoincolumn"><code>@MapKeyJoinColumn</code></a> mappings when the <code>java.util.Map</code> association key uses a composite identifier.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapkeytemporal"><a class="anchor" href="#annotations-jpa-mapkeytemporal"></a>46. <code>@MapKeyTemporal</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapKeyTemporal.html"><code>@MapKeyTemporal</code></a> annotation is used to specify that the key of <code>java.util.Map</code> association is a <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/TemporalType.html"><code>@TemporalType</code></a> (e.g. <code>DATE</code>, <code>TIME</code>, <code>TIMESTAMP</code>).</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-map-unidirectional-example"><code>@MapKeyTemporal</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mappedsuperclass"><a class="anchor" href="#annotations-jpa-mappedsuperclass"></a>47. <code>@MappedSuperclass</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MappedSuperclass.html"><code>@MappedSuperclass</code></a> annotation is used to specify that the currently annotated type attributes are inherited by any subclass entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#entity-inheritance-mapped-superclass"><code>@MappedSuperclass</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-mapsid"><a class="anchor" href="#annotations-jpa-mapsid"></a>48. <code>@MapsId</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapsId.html"><code>@MapsId</code></a> annotation is used to specify that the entity identifier is mapped by the currently annotated <code>@ManyToOne</code> or <code>@OneToOne</code> association.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-derived-mapsid"><code>@MapsId</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedattributenode"><a class="anchor" href="#annotations-jpa-namedattributenode"></a>49. <code>@NamedAttributeNode</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedAttributeNode.html"><code>@NamedAttributeNode</code></a> annotation is used to specify each individual attribute node that needs to be fetched by an Entity Graph.</p>
</div>
<div class="paragraph">
<p>See the <a href="#fetching-strategies-dynamic-fetching-entity-graph-example">Fetch graph</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedentitygraph"><a class="anchor" href="#annotations-jpa-namedentitygraph"></a>50. <code>@NamedEntityGraph</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedEntityGraph.html"><code>@NamedEntityGraph</code></a> annotation is used to specify an Entity Graph that can be used by an entity query to override the default fetch plan.</p>
</div>
<div class="paragraph">
<p>See the <a href="#fetching-strategies-dynamic-fetching-entity-graph-example">Fetch graph</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedentitygraphs"><a class="anchor" href="#annotations-jpa-namedentitygraphs"></a>51. <code>@NamedEntityGraphs</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedEntityGraphs.html"><code>@NamedEntityGraphs</code></a> annotation is used to group multiple <a href="#annotations-jpa-namedentitygraph"><code>@NamedEntityGraph</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namednativequeries"><a class="anchor" href="#annotations-jpa-namednativequeries"></a>52. <code>@NamedNativeQueries</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedNativeQueries.html"><code>@NamedNativeQueries</code></a> annotation is used to group multiple <a href="#annotations-jpa-namednativequery"><code>@NamedNativeQuery</code></a> annotations.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-custom-crud-example">Custom CRUD mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namednativequery"><a class="anchor" href="#annotations-jpa-namednativequery"></a>53. <code>@NamedNativeQuery</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedNativeQuery.html"><code>@NamedNativeQuery</code></a> annotation is used to specify a native SQL query that can be retrieved later by its name.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-custom-crud-example">Custom CRUD mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedqueries"><a class="anchor" href="#annotations-jpa-namedqueries"></a>54. <code>@NamedQueries</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedQueries.html"><code>@NamedQueries</code></a> annotation is used to group multiple <a href="#annotations-jpa-namedquery"><code>@NamedQuery</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedquery"><a class="anchor" href="#annotations-jpa-namedquery"></a>55. <code>@NamedQuery</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedQuery.html"><code>@NamedQuery</code></a> annotation is used to specify a JPQL query that can be retrieved later by its name.</p>
</div>
<div class="paragraph">
<p>See the <a href="#jpql-api-named-query-example"><code>@NamedQuery</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedstoredprocedurequeries"><a class="anchor" href="#annotations-jpa-namedstoredprocedurequeries"></a>56. <code>@NamedStoredProcedureQueries</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedStoredProcedureQueries.html"><code>@NamedStoredProcedureQueries</code></a> annotation is used to group multiple <a href="#annotations-jpa-namedstoredprocedurequery"><code>@NamedStoredProcedureQuery</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedstoredprocedurequery"><a class="anchor" href="#annotations-jpa-namedstoredprocedurequery"></a>57. <code>@NamedStoredProcedureQuery</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedStoredProcedureQuery.html"><code>@NamedStoredProcedureQuery</code></a> annotation is used to specify a stored procedure query that can be retrieved later by its name.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-sp-named-query">Using named queries to call stored procedures</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-namedsubgraph"><a class="anchor" href="#annotations-jpa-namedsubgraph"></a>58. <code>@NamedSubgraph</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/NamedSubgraph.html"><code>@NamedSubgraph</code></a> annotation used to specify a subgraph in an Entity Graph.</p>
</div>
<div class="paragraph">
<p>See the <a href="#fetching-strategies-dynamic-fetching-entity-subgraph">Fetch subgraph</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-onetomany"><a class="anchor" href="#annotations-jpa-onetomany"></a>59. <code>@OneToMany</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/OneToMany.html"><code>@OneToMany</code></a> annotation is used to specify a one-to-many database relationship.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-one-to-many"><code>@OneToMany</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-onetoone"><a class="anchor" href="#annotations-jpa-onetoone"></a>60. <code>@OneToOne</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/OneToOne.html"><code>@OneToOne</code></a> annotation is used to specify a one-to-one database relationship.</p>
</div>
<div class="paragraph">
<p>See the <a href="#associations-one-to-one"><code>@OneToOne</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-orderby"><a class="anchor" href="#annotations-jpa-orderby"></a>61. <code>@OrderBy</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/OrderBy.html"><code>@OrderBy</code></a> annotation is used to specify the entity attributes used for sorting when fetching the currently annotated collection.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-unidirectional-ordered-list"><code>@OrderBy</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-ordercolumn"><a class="anchor" href="#annotations-jpa-ordercolumn"></a>62. <code>@OrderColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/OrderColumn.html"><code>@OrderColumn</code></a> annotation is used to specify that the current annotation collection order should be materialized in the database.</p>
</div>
<div class="paragraph">
<p>See the <a href="#collections-unidirectional-ordered-list-order-column-example"><code>@OrderColumn</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-persistencecontext"><a class="anchor" href="#annotations-jpa-persistencecontext"></a>63. <code>@PersistenceContext</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PersistenceContext.html"><code>@PersistenceContext</code></a> annotation is used to specify the <code>EntityManager</code> that needs to be injected as a dependency.</p>
</div>
<div class="paragraph">
<p>See the <a href="#bootstrap-jpa-compliant-PersistenceContext-example"><code>@PersistenceContext</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-persistencecontexts"><a class="anchor" href="#annotations-jpa-persistencecontexts"></a>64. <code>@PersistenceContexts</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PersistenceContexts.html"><code>@PersistenceContexts</code></a> annotation is used to group multiple <a href="#annotations-jpa-persistencecontext"><code>@PersistenceContext</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-persistenceproperty"><a class="anchor" href="#annotations-jpa-persistenceproperty"></a>65. <code>@PersistenceProperty</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PersistenceProperty.html"><code>@PersistenceProperty</code></a> annotation is used by the <a href="#annotations-jpa-persistencecontext"><code>@PersistenceContext</code></a> annotation to declare JPA provider properties that are passed to the underlying container when the <code>EntityManager</code> instance is created.</p>
</div>
<div class="paragraph">
<p>See the <a href="#bootstrap-jpa-compliant-PersistenceContext-configurable-example"><code>@PersistenceProperty</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-persistenceunit"><a class="anchor" href="#annotations-jpa-persistenceunit"></a>66. <code>@PersistenceUnit</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PersistenceUnit.html"><code>@PersistenceUnit</code></a> annotation is used to specify the <code>EntityManagerFactory</code> that needs to be injected as a dependency.</p>
</div>
<div class="paragraph">
<p>See the <a href="#bootstrap-jpa-compliant-PersistenceUnit-example"><code>@PersistenceUnit</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-persistenceunits"><a class="anchor" href="#annotations-jpa-persistenceunits"></a>67. <code>@PersistenceUnits</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PersistenceUnits.html"><code>@PersistenceUnits</code></a> annotation is used to group multiple <a href="#annotations-jpa-persistenceunit"><code>@PersistenceUnit</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-postload"><a class="anchor" href="#annotations-jpa-postload"></a>68. <code>@PostLoad</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PostLoad.html"><code>@PostLoad</code></a> annotation is used to specify a callback method that fires after an entity is loaded.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-postpersist"><a class="anchor" href="#annotations-jpa-postpersist"></a>69. <code>@PostPersist</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PostPersist.html"><code>@PostPersist</code></a> annotation is used to specify a callback method that fires after an entity is persisted.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-postremove"><a class="anchor" href="#annotations-jpa-postremove"></a>70. <code>@PostRemove</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PostRemove.html"><code>@PostRemove</code></a> annotation is used to specify a callback method that fires after an entity is removed.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-postupdate"><a class="anchor" href="#annotations-jpa-postupdate"></a>71. <code>@PostUpdate</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PostUpdate.html"><code>@PostUpdate</code></a> annotation is used to specify a callback method that fires after an entity is updated.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-prepersist"><a class="anchor" href="#annotations-jpa-prepersist"></a>72. <code>@PrePersist</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PrePersist.html"><code>@PrePersist</code></a> annotation is used to specify a callback method that fires before an entity is persisted.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-preremove"><a class="anchor" href="#annotations-jpa-preremove"></a>73. <code>@PreRemove</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PreRemove.html"><code>@PreRemove</code></a> annotation is used to specify a callback method that fires before an entity is removed.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-preupdate"><a class="anchor" href="#annotations-jpa-preupdate"></a>74. <code>@PreUpdate</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PreUpdate.html"><code>@PreUpdate</code></a> annotation is used to specify a callback method that fires before an entity is updated.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example">JPA callbacks</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-primarykeyjoincolumn"><a class="anchor" href="#annotations-jpa-primarykeyjoincolumn"></a>75. <code>@PrimaryKeyJoinColumn</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PrimaryKeyJoinColumn.html"><code>@PrimaryKeyJoinColumn</code></a> annotation is used to specify that the primary key column of the currently annotated entity is also a foreign key to some other entity
(e.g. a base class table in a <code>JOINED</code> inheritance strategy, the primary table in a secondary table mapping, or the parent table in a <code>@OneToOne</code> relationship).</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-derived-primarykeyjoincolumn"><code>@PrimaryKeyJoinColumn</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-primarykeyjoincolumns"><a class="anchor" href="#annotations-jpa-primarykeyjoincolumns"></a>76. <code>@PrimaryKeyJoinColumns</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/PrimaryKeyJoinColumns.html"><code>@PrimaryKeyJoinColumns</code></a> annotation is used to group multiple <a href="#annotations-jpa-primarykeyjoincolumn"><code>@PrimaryKeyJoinColumn</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-queryhint"><a class="anchor" href="#annotations-jpa-queryhint"></a>77. <code>@QueryHint</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/QueryHint.html"><code>@QueryHint</code></a> annotation is used to specify a JPA provider hint used by a <code>@NamedQuery</code> or a <code>@NamedNativeQuery</code> annotation.</p>
</div>
<div class="paragraph">
<p>See the <a href="#jpa-read-only-entities-native-example"><code>@QueryHint</code></a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-secondarytable"><a class="anchor" href="#annotations-jpa-secondarytable"></a>78. <code>@SecondaryTable</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/SecondaryTable.html"><code>@SecondaryTable</code></a> annotation is used to specify a secondary table for the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-custom-crud-secondary-table-example"><code>@SecondaryTable</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-secondarytables"><a class="anchor" href="#annotations-jpa-secondarytables"></a>79. <code>@SecondaryTables</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/SecondaryTables.html"><code>@SecondaryTables</code></a> annotation is used to group multiple <a href="#annotations-jpa-secondarytable"><code>@SecondaryTable</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-sequencegenerator"><a class="anchor" href="#annotations-jpa-sequencegenerator"></a>80. <code>@SequenceGenerator</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/SequenceGenerator.html"><code>@SequenceGenerator</code></a> annotation is used to specify the database sequence used by the identifier generator of the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-generators-sequence-configured"><code>@SequenceGenerator</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-sqlresultsetmapping"><a class="anchor" href="#annotations-jpa-sqlresultsetmapping"></a>81. <code>@SqlResultSetMapping</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/SqlResultSetMapping.html"><code>@SqlResultSetMapping</code></a> annotation is used to specify the <code>ResultSet</code> mapping of a native SQL query or stored procedure.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-composite-key-entity-associations_named-query-example"><code>SqlResultSetMapping</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-sqlresultsetmappings"><a class="anchor" href="#annotations-jpa-sqlresultsetmappings"></a>82. <code>@SqlResultSetMappings</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/SqlResultSetMappings.html"><code>@SqlResultSetMappings</code></a> annotation is group multiple <a href="#annotations-jpa-sqlresultsetmapping"><code>@SqlResultSetMapping</code></a> annotations.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-storedprocedureparameter"><a class="anchor" href="#annotations-jpa-storedprocedureparameter"></a>83. <code>@StoredProcedureParameter</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/StoredProcedureParameter.html"><code>@StoredProcedureParameter</code></a> annotation is used to specify a parameter of a <a href="#annotations-jpa-namedstoredprocedurequery"><code>@NamedStoredProcedureQuery</code></a>.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-sp-named-query">Using named queries to call stored procedures</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-table"><a class="anchor" href="#annotations-jpa-table"></a>84. <code>@Table</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Table.html"><code>@Table</code></a> annotation is used to specify the primary table of the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#sql-custom-crud-secondary-table-example"><code>@Table</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-tablegenerator"><a class="anchor" href="#annotations-jpa-tablegenerator"></a>85. <code>@TableGenerator</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/TableGenerator.html"><code>@TableGenerator</code></a> annotation is used to specify the database table used by the identity generator of the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#identifiers-generators-table-configured-mapping-example"><code>@TableGenerator</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-temporal"><a class="anchor" href="#annotations-jpa-temporal"></a>86. <code>@Temporal</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Temporal.html"><code>@Temporal</code></a> annotation is used to specify the <code>TemporalType</code> of the currently annotated <code>java.util.Date</code> or <code>java.util.Calendar</code> entity attribute.</p>
</div>
<div class="paragraph">
<p>See the <a href="#basic-datetime">Basic temporal types</a> chapter for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-transient"><a class="anchor" href="#annotations-jpa-transient"></a>87. <code>@Transient</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Transient.html"><code>@Transient</code></a> annotation is used to specify that a given entity attribute should not be persisted.</p>
</div>
<div class="paragraph">
<p>See the <a href="#events-jpa-callbacks-example"><code>@Transient</code> mapping</a> section for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-uniqueconstraint"><a class="anchor" href="#annotations-jpa-uniqueconstraint"></a>88. <code>@UniqueConstraint</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/UniqueConstraint.html"><code>@UniqueConstraint</code></a> annotation is used to specify a unique constraint to be included by the automated schema generator for the primary or secondary table associated with the currently annotated entity.</p>
</div>
<div class="paragraph">
<p>See the <a href="#schema-generation-columns-unique-constraint">Columns unique constraint</a> chapter for more info.</p>
</div>
</div>
<div class="sect3">
<h4 id="annotations-jpa-version"><a class="anchor" href="#annotations-jpa-version"></a>89. <code>@Version</code></h4>
<div class="paragraph">
<p>The <a href="https://javaee.github.io/javaee-spec/javadocs/javax/persistence/Version.html"><code>@Version</code></a> annotation is used to specify the version attribute used for optimistic locking.</p>
</div>
<div class="paragraph">
<p>See the <a href="#locking-optimistic">Optimistic locking mapping</a> section for more info.</p>
</div>
</div>
</div>
