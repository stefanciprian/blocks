export namespace main {
	
	export class Application {
	    id?: number;
	    name: string;
	    description: string;
	    path?: string;
	    is_generated?: boolean;
	    is_selected?: boolean;
	    // Go type: time
	    created_at?: any;
	    // Go type: time
	    updated_at?: any;
	
	    static createFrom(source: any = {}) {
	        return new Application(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.path = source["path"];
	        this.is_generated = source["is_generated"];
	        this.is_selected = source["is_selected"];
	        this.created_at = this.convertValues(source["created_at"], null);
	        this.updated_at = this.convertValues(source["updated_at"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace notion {
	
	export class Annotations {
	    bold?: boolean;
	    italic?: boolean;
	    strikethrough?: boolean;
	    underline?: boolean;
	    code?: boolean;
	    color?: string;
	
	    static createFrom(source: any = {}) {
	        return new Annotations(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.bold = source["bold"];
	        this.italic = source["italic"];
	        this.strikethrough = source["strikethrough"];
	        this.underline = source["underline"];
	        this.code = source["code"];
	        this.color = source["color"];
	    }
	}
	export class BaseUser {
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new BaseUser(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}
	export class Person {
	    email: string;
	
	    static createFrom(source: any = {}) {
	        return new Person(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.email = source["email"];
	    }
	}
	export class User {
	    id: string;
	    type: string;
	    name: string;
	    avatar_url: string;
	    person?: Person;
	    bot?: Bot;
	
	    static createFrom(source: any = {}) {
	        return new User(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.type = source["type"];
	        this.name = source["name"];
	        this.avatar_url = source["avatar_url"];
	        this.person = this.convertValues(source["person"], Person);
	        this.bot = this.convertValues(source["bot"], Bot);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class BotOwner {
	    type: string;
	    workspace: boolean;
	    user?: User;
	
	    static createFrom(source: any = {}) {
	        return new BotOwner(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.workspace = source["workspace"];
	        this.user = this.convertValues(source["user"], User);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Bot {
	    owner: BotOwner;
	
	    static createFrom(source: any = {}) {
	        return new Bot(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.owner = this.convertValues(source["owner"], BotOwner);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class FileExternal {
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new FileExternal(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	    }
	}
	export class FileFile {
	    url: string;
	    // Go type: DateTime
	    expiry_time: any;
	
	    static createFrom(source: any = {}) {
	        return new FileFile(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.expiry_time = this.convertValues(source["expiry_time"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Cover {
	    type: string;
	    file?: FileFile;
	    external?: FileExternal;
	
	    static createFrom(source: any = {}) {
	        return new Cover(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.file = this.convertValues(source["file"], FileFile);
	        this.external = this.convertValues(source["external"], FileExternal);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Icon {
	    type: string;
	    emoji?: string;
	    file?: FileFile;
	    external?: FileExternal;
	
	    static createFrom(source: any = {}) {
	        return new Icon(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.emoji = source["emoji"];
	        this.file = this.convertValues(source["file"], FileFile);
	        this.external = this.convertValues(source["external"], FileExternal);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Parent {
	    type?: string;
	    block_id?: string;
	    page_id?: string;
	    database_id?: string;
	    workspace?: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Parent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.block_id = source["block_id"];
	        this.page_id = source["page_id"];
	        this.database_id = source["database_id"];
	        this.workspace = source["workspace"];
	    }
	}
	export class StatusGroup {
	    id?: string;
	    name?: string;
	    color?: string;
	    option_ids?: string[];
	
	    static createFrom(source: any = {}) {
	        return new StatusGroup(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.color = source["color"];
	        this.option_ids = source["option_ids"];
	    }
	}
	export class StatusMetadata {
	    options: SelectOptions[];
	    groups: StatusGroup[];
	
	    static createFrom(source: any = {}) {
	        return new StatusMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.options = this.convertValues(source["options"], SelectOptions);
	        this.groups = this.convertValues(source["groups"], StatusGroup);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RollupMetadata {
	    relation_property_name?: string;
	    relation_property_id?: string;
	    rollup_property_name?: string;
	    rollup_property_id?: string;
	    function?: string;
	
	    static createFrom(source: any = {}) {
	        return new RollupMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.relation_property_name = source["relation_property_name"];
	        this.relation_property_id = source["relation_property_id"];
	        this.rollup_property_name = source["rollup_property_name"];
	        this.rollup_property_id = source["rollup_property_id"];
	        this.function = source["function"];
	    }
	}
	export class DualPropertyRelation {
	    synced_property_id?: string;
	    synced_property_name?: string;
	
	    static createFrom(source: any = {}) {
	        return new DualPropertyRelation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.synced_property_id = source["synced_property_id"];
	        this.synced_property_name = source["synced_property_name"];
	    }
	}
	export class RelationMetadata {
	    database_id?: string;
	    type?: string;
	    // Go type: struct {}
	    single_property?: any;
	    dual_property?: DualPropertyRelation;
	
	    static createFrom(source: any = {}) {
	        return new RelationMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.database_id = source["database_id"];
	        this.type = source["type"];
	        this.single_property = this.convertValues(source["single_property"], Object);
	        this.dual_property = this.convertValues(source["dual_property"], DualPropertyRelation);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class FormulaMetadata {
	    expression: string;
	
	    static createFrom(source: any = {}) {
	        return new FormulaMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.expression = source["expression"];
	    }
	}
	export class SelectOptions {
	    id?: string;
	    name?: string;
	    color?: string;
	
	    static createFrom(source: any = {}) {
	        return new SelectOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.color = source["color"];
	    }
	}
	export class SelectMetadata {
	    options: SelectOptions[];
	
	    static createFrom(source: any = {}) {
	        return new SelectMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.options = this.convertValues(source["options"], SelectOptions);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class NumberMetadata {
	    format: string;
	
	    static createFrom(source: any = {}) {
	        return new NumberMetadata(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.format = source["format"];
	    }
	}
	export class DatabaseProperty {
	    id?: string;
	    type: string;
	    name?: string;
	    // Go type: EmptyMetadata
	    title?: any;
	    // Go type: EmptyMetadata
	    rich_text?: any;
	    // Go type: EmptyMetadata
	    date?: any;
	    // Go type: EmptyMetadata
	    people?: any;
	    // Go type: EmptyMetadata
	    files?: any;
	    // Go type: EmptyMetadata
	    checkbox?: any;
	    // Go type: EmptyMetadata
	    url?: any;
	    // Go type: EmptyMetadata
	    email?: any;
	    // Go type: EmptyMetadata
	    phone_number?: any;
	    // Go type: EmptyMetadata
	    created_time?: any;
	    // Go type: EmptyMetadata
	    created_by?: any;
	    // Go type: EmptyMetadata
	    last_edited_time?: any;
	    // Go type: EmptyMetadata
	    last_edited_by?: any;
	    number?: NumberMetadata;
	    select?: SelectMetadata;
	    multi_select?: SelectMetadata;
	    formula?: FormulaMetadata;
	    relation?: RelationMetadata;
	    rollup?: RollupMetadata;
	    status?: StatusMetadata;
	
	    static createFrom(source: any = {}) {
	        return new DatabaseProperty(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.type = source["type"];
	        this.name = source["name"];
	        this.title = this.convertValues(source["title"], null);
	        this.rich_text = this.convertValues(source["rich_text"], null);
	        this.date = this.convertValues(source["date"], null);
	        this.people = this.convertValues(source["people"], null);
	        this.files = this.convertValues(source["files"], null);
	        this.checkbox = this.convertValues(source["checkbox"], null);
	        this.url = this.convertValues(source["url"], null);
	        this.email = this.convertValues(source["email"], null);
	        this.phone_number = this.convertValues(source["phone_number"], null);
	        this.created_time = this.convertValues(source["created_time"], null);
	        this.created_by = this.convertValues(source["created_by"], null);
	        this.last_edited_time = this.convertValues(source["last_edited_time"], null);
	        this.last_edited_by = this.convertValues(source["last_edited_by"], null);
	        this.number = this.convertValues(source["number"], NumberMetadata);
	        this.select = this.convertValues(source["select"], SelectMetadata);
	        this.multi_select = this.convertValues(source["multi_select"], SelectMetadata);
	        this.formula = this.convertValues(source["formula"], FormulaMetadata);
	        this.relation = this.convertValues(source["relation"], RelationMetadata);
	        this.rollup = this.convertValues(source["rollup"], RollupMetadata);
	        this.status = this.convertValues(source["status"], StatusMetadata);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Equation {
	    expression: string;
	
	    static createFrom(source: any = {}) {
	        return new Equation(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.expression = source["expression"];
	    }
	}
	export class TemplateMention {
	    type: string;
	    template_mention_date?: string;
	    template_mention_user?: string;
	
	    static createFrom(source: any = {}) {
	        return new TemplateMention(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.template_mention_date = source["template_mention_date"];
	        this.template_mention_user = source["template_mention_user"];
	    }
	}
	export class LinkPreview {
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new LinkPreview(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	    }
	}
	export class Date {
	    // Go type: DateTime
	    start: any;
	    // Go type: DateTime
	    end?: any;
	    time_zone?: string;
	
	    static createFrom(source: any = {}) {
	        return new Date(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.start = this.convertValues(source["start"], null);
	        this.end = this.convertValues(source["end"], null);
	        this.time_zone = source["time_zone"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ID {
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new ID(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	    }
	}
	export class Mention {
	    type: string;
	    user?: User;
	    page?: ID;
	    database?: ID;
	    date?: Date;
	    link_preview?: LinkPreview;
	    template_mention?: TemplateMention;
	
	    static createFrom(source: any = {}) {
	        return new Mention(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.user = this.convertValues(source["user"], User);
	        this.page = this.convertValues(source["page"], ID);
	        this.database = this.convertValues(source["database"], ID);
	        this.date = this.convertValues(source["date"], Date);
	        this.link_preview = this.convertValues(source["link_preview"], LinkPreview);
	        this.template_mention = this.convertValues(source["template_mention"], TemplateMention);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Link {
	    url: string;
	
	    static createFrom(source: any = {}) {
	        return new Link(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	    }
	}
	export class Text {
	    content: string;
	    link?: Link;
	
	    static createFrom(source: any = {}) {
	        return new Text(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.content = source["content"];
	        this.link = this.convertValues(source["link"], Link);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class RichText {
	    type?: string;
	    annotations?: Annotations;
	    plain_text?: string;
	    href?: string;
	    text?: Text;
	    mention?: Mention;
	    equation?: Equation;
	
	    static createFrom(source: any = {}) {
	        return new RichText(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.annotations = this.convertValues(source["annotations"], Annotations);
	        this.plain_text = source["plain_text"];
	        this.href = source["href"];
	        this.text = this.convertValues(source["text"], Text);
	        this.mention = this.convertValues(source["mention"], Mention);
	        this.equation = this.convertValues(source["equation"], Equation);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Database {
	    id: string;
	    // Go type: time
	    created_time: any;
	    created_by: BaseUser;
	    // Go type: time
	    last_edited_time: any;
	    last_edited_by: BaseUser;
	    url: string;
	    title: RichText[];
	    description: RichText[];
	    properties: {[key: string]: DatabaseProperty};
	    parent: Parent;
	    icon?: Icon;
	    cover?: Cover;
	    archived: boolean;
	    is_inline: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Database(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.created_time = this.convertValues(source["created_time"], null);
	        this.created_by = this.convertValues(source["created_by"], BaseUser);
	        this.last_edited_time = this.convertValues(source["last_edited_time"], null);
	        this.last_edited_by = this.convertValues(source["last_edited_by"], BaseUser);
	        this.url = source["url"];
	        this.title = this.convertValues(source["title"], RichText);
	        this.description = this.convertValues(source["description"], RichText);
	        this.properties = this.convertValues(source["properties"], DatabaseProperty, true);
	        this.parent = this.convertValues(source["parent"], Parent);
	        this.icon = this.convertValues(source["icon"], Icon);
	        this.cover = this.convertValues(source["cover"], Cover);
	        this.archived = source["archived"];
	        this.is_inline = source["is_inline"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}

