export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  coverImage?: string;
  author: string;
  authorRole: string;
  date: string;
  status: 'draft' | 'published';
  tags?: string[];
}

const STORAGE_KEY = 'flint_racks_blog_posts_v6';

const defaultPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'maximizando-la-eficiencia-del-almacen-con-racks-selectivos',
    title: 'Maximizando la Eficiencia del Almacén con Racks Selectivos para Tarimas',
    titleEn: 'Maximizing Warehouse Efficiency with Selective Pallet Racking',
    excerpt: 'Descubre cómo los sistemas de rack selectivo para tarimas pueden transformar las operaciones de tu almacén, mejorando la accesibilidad y densidad de almacenamiento simultáneamente.',
    excerptEn: 'Discover how selective pallet racking systems can transform your warehouse operations, improving accessibility and storage density simultaneously.',
    coverImage: '/assets/blog-cover-1.webp',
    content: `El rack selectivo para tarimas es el sistema de almacenamiento más común y versátil en los almacenes actuales. Su diseño permite acceso directo a cada posición de tarima, lo que lo hace ideal para operaciones que requieren alta selectividad y una rotación rápida de inventario.

## ¿Por qué elegir rack selectivo?

La principal ventaja del rack selectivo es la accesibilidad. A diferencia de sistemas como drive-in o push-back, cada ubicación de tarima es accesible directamente desde el pasillo. Esto permite:

- **Tiempos de picking más rápidos:** los operadores acceden a cualquier SKU sin mover otras tarimas
- **Gestión de inventario FIFO:** la rotación primero en entrar, primero en salir se mantiene de forma natural
- **Configuración flexible:** los niveles de carga se ajustan para adaptarse a distintas alturas de tarima

## Consideraciones de Diseño

Al planear la instalación de racks selectivos, es fundamental evaluar varios factores:

- **Capacidad de carga:** cada par de vigas debe soportar el peso de las tarimas almacenadas
- **Requerimientos sísmicos:** en zonas con actividad sísmica se requiere refuerzo y anclaje adicional
- **Ancho de pasillos:** define el tipo de montacargas que puede operar
- **Altura del inmueble:** aprovechar el espacio vertical reduce la huella del almacén

## El enfoque Flint Racks

En Flint Racks diseñamos cada sistema de rack selectivo de acuerdo con las necesidades específicas de tu operación. Nuestro equipo realiza evaluaciones detalladas del sitio, considerando condiciones del piso, alturas disponibles y flujos de trabajo antes de desarrollar la solución ideal.

Cada instalación está respaldada por nuestro compromiso con la seguridad y la integridad estructural, porque un rack no solo almacena productos: sostiene toda tu operación.`,
    contentEn: `Selective pallet racking is the most common and versatile storage system in warehouses today. Its design allows direct access to each pallet position, making it ideal for operations requiring high selectivity and rapid inventory turnover.

## Why Choose Selective Rack?

The main advantage of selective racking is accessibility. Unlike drive-in or push-back systems, every pallet location is directly accessible from the aisle. This allows for:

- **Faster Picking Times:** operators access any SKU without moving other pallets.
- **FIFO Inventory Management:** First-In, First-Out rotation is naturally maintained.
- **Flexible Configuration:** load levels adjust to accommodate different pallet heights.

## Design Considerations

When planning a selective rack installation, it is essential to evaluate several factors:

- **Load Capacity:** each pair of beams must support the weight of the stored pallets.
- **Seismic Requirements:** in zones with seismic activity, additional reinforcement and anchoring are required.
- **Aisle Width:** defines the type of forklift that can operate.
- **Building Height:** taking advantage of vertical space reduces the warehouse footprint.

## The Flint Racks Approach

At Flint Racks, we design each selective rack system according to the specific needs of your operation. Our team performs detailed site evaluations, considering floor conditions, available heights, and workflows before developing the ideal solution.

Each installation is backed by our commitment to safety and structural integrity, because a rack doesn't just store products: it holds your entire operation.`,
    author: 'Thomas Edwards',
    authorRole: 'COO',
    date: '2026-03-04',
    status: 'published',
  },
  {
    id: '2',
    slug: 'seguridad-ante-todo-mejores-practicas-para-inspeccion-de-racks',
    title: 'Seguridad Ante Todo: Mejores Prácticas para la Inspección de Racks',
    titleEn: 'Safety First: Best Practices for Rack Inspection',
    excerpt: 'Las inspecciones regulares de los racks son críticas para mantener un entorno de almacén seguro. Conoce los puntos de control clave que todo gerente de instalaciones debe saber.',
    excerptEn: 'Regular rack inspections are critical to maintaining a safe warehouse environment. Learn the key checkpoints every facility manager should know.',
    coverImage: '/assets/blog-cover-2.webp',
    content: `La seguridad en un almacén comienza con la integridad estructural de sus sistemas de racks. Un rack con daños o con mantenimiento deficiente puede poner en riesgo al personal, al inventario y a la continuidad de toda la operación. Revisar a tiempo es proteger el negocio.

## La importancia de las inspecciones periódicas

De acuerdo con los estándares de la industria, los sistemas de racks deben someterse a inspecciones formales al menos una vez al año por un ingeniero calificado. A esto se suman las revisiones visuales diarias realizadas por el personal del almacén, fundamentales para detectar cualquier anomalía de forma temprana y evitar riesgos mayores.

Una inspección constante permite anticiparse a fallas, extender la vida útil de la estructura y mantener la operación funcionando con orden y seguridad.

## Puntos clave de inspección

### Postes y Marcos
- Revisión visual de golpes, deformaciones o curvaturas
- Verificación de anclajes firmes y en buen estado
- Identificación de corrosión o desgaste en la base

### Vigas y Conectores
- Confirmación de seguros, clips y pasadores correctamente colocados
- Revisión de deflexión en vigas bajo carga
- Verificación de uniones sólidas entre vigas y postes

### Condiciones de Carga
- Correcta colocación de tarimas sobre las vigas
- Cumplimiento de la capacidad de carga especificada
- Distribución equilibrada del peso en cada nivel

## Cuándo Actuar

Cualquier daño que comprometa la capacidad estructural de un componente requiere atención inmediata y protocolos claros:

- Retiro de la carga del área afectada
- Aislamiento del espacio para proteger al personal
- Evaluación por un ingeniero especializado
- Registro del daño con evidencia visual y mediciones`,
    contentEn: `Safety in a warehouse begins with the structural integrity of its racking systems. A damaged or poorly maintained rack can put personnel, inventory, and the continuity of the entire operation at risk. Checking on time is protecting the business.

## The Importance of Periodic Inspections

According to industry standards, racking systems should undergo formal inspections at least once a year by a qualified engineer. Added to this are the daily visual reviews performed by warehouse personnel, essential for detecting any anomaly early and avoiding greater risks.

Constant inspection allows for anticipating failures, extending the useful life of the structure, and keeping the operation running with order and safety.

## Key Inspection Points

### Uprights and Frames
- Visual review for impacts, deformations, or bends.
- Verification of firm anchoring in good condition.
- Identification of corrosion or wear at the base.

### Beams and Connectors
- Confirmation of safety locks, clips, and pins correctly placed.
- Review of beam deflection under load.
- Verification of solid connections between beams and uprights.

### Loading Conditions
- Correct placement of pallets on the beams.
- Compliance with the specified load capacity.
- Balanced weight distribution on each level.

## When to Act

Any damage that compromises the structural capacity of a component requires immediate attention and clear protocols:

- Removal of the load from the affected area.
- Isolation of the space to protect personnel.
- Evaluation by a specialized engineer.
- Recording the damage with visual evidence and measurements.`,
    author: 'María González',
    authorRole: 'Safety Director',
    date: '2026-03-11',
    status: 'published',
  },
  {
    id: '3',
    slug: 'racks-drive-in-vs-push-back-cual-es-el-adecuado',
    title: 'Racks Drive-In vs. Push-Back: ¿Cuál es el Adecuado para tu Operación?',
    titleEn: 'Drive-In vs. Push-Back Racks: Which One is Right for Your Operation?',
    excerpt: 'Cuando el espacio en bodega se vuelve un recurso crítico, los sistemas de almacenamiento de alta densidad dejan de ser una opción y se convierten en una necesidad estratégica.',
    excerptEn: 'When warehouse space becomes a critical resource, high-density storage systems stop being an option and become a strategic necessity.',
    coverImage: '/assets/blog-cover-3.webp',
    content: `Cuando el espacio en bodega se vuelve un recurso crítico, los sistemas de almacenamiento de alta densidad dejan de ser una opción y se convierten en una necesidad estratégica. Dos de las soluciones más utilizadas en este escenario son los **racks drive-in** y los **racks push-back**. Ambos están diseñados para maximizar la capacidad de almacenaje, pero funcionan bajo principios operativos muy distintos.

Entender estas diferencias es clave para elegir el sistema que realmente impulse la eficiencia, seguridad y rentabilidad de tu operación.

## RACKS DRIVE-IN

El sistema **drive-in** permite que los montacargas ingresen directamente dentro de la estructura del rack para colocar o retirar tarimas. Esto crea carriles profundos de almacenamiento y elimina los pasillos entre racks, logrando una densidad máxima por metro cuadrado.

### Ideal para:

- Grandes volúmenes del mismo SKU
- Gestión de inventarios bajo el método **LIFO** (último en entrar, primero en salir)
- Cámaras de refrigeración o congelación, donde el costo por metro cúbico es elevado

### Consideraciones clave:

- Tiempos de acceso más lentos frente a sistemas selectivos
- Mayor riesgo de impactos estructurales por maniobras del montacargas
- Un solo punto de acceso por carril, lo que limita la selectividad

El drive-in es una solución robusta cuando la prioridad es almacenar mucho, del mismo producto, en el menor espacio posible.

## RACKS PUSH-BACK

El sistema **push-back** utiliza carros anidados que se desplazan sobre rieles inclinados. Al ingresar una nueva tarima, esta empuja a las existentes hacia el fondo. Al retirar una, las demás avanzan automáticamente hacia el frente.`,
    contentEn: `When warehouse space becomes a critical resource, high-density storage systems stop being an option and become a strategic necessity. Two of the most used solutions in this scenario are **drive-in racks** and **push-back racks**. Both are designed to maximize storage capacity, but they function under very different operational principles.

Understanding these differences is key to choosing the system that truly drives the efficiency, safety, and profitability of your operation.

## DRIVE-IN RACKS

The **drive-in** system allows forklifts to enter directly into the rack structure to place or retrieve pallets. This creates deep storage lanes and eliminates aisles between racks, achieving maximum density per square meter.

### Ideal for:

- High volumes of the same SKU.
- Inventory management under the **LIFO** (last-in, first-out) method.
- Cold or freezer rooms, where the cost per cubic meter is high.

### Key Considerations:

- Slower access times compared to selective systems.
- Higher risk of structural impacts from forklift maneuvers.
- A single access point per lane, limiting selectivity.

Drive-in is a robust solution when the priority is to store a lot of the same product in as little space as possible.

## PUSH-BACK RACKS

The **push-back** system uses nested carts that move on tilted rails. When a new pallet is loaded, it pushes the existing ones to the back. When one is removed, the others automatically move to the front.`,
    author: 'Carlos Mendoza',
    authorRole: 'Design Engineer',
    date: '2026-03-18',
    status: 'published',
  },
  {
    id: '4',
    slug: 'upcoming-warehouse-automation-trends-2026',
    title: 'Tendencias en Automatización de Almacenes 2026',
    titleEn: 'Upcoming Warehouse Automation Trends for 2026',
    excerpt: 'Una vista previa de las tecnologías de automatización que transformarán las operaciones de almacén el próximo año.',
    excerptEn: 'A preview of the automation technologies that will reshape warehouse operations in the coming year.',
    coverImage: '/assets/blog-cover-4.jpg',
    content: `La industria de los almacenes está en la cúspide de una gran transformación. A medida que los costos laborales aumentan y las demandas del comercio electrónico crecen, la automatización ya no es un lujo, es una necesidad.`,
    contentEn: `The warehouse industry is on the cusp of a major transformation. As labor costs rise and e-commerce demands grow, automation is no longer a luxury — it's a necessity.

## Key Trends to Watch

### Autonomous Mobile Robots (AMRs)
AMRs are becoming increasingly affordable and capable. These robots can navigate warehouse floors independently, transporting goods between picking stations and storage locations.

### Automated Storage and Retrieval Systems (AS/RS)
Mini-load and unit-load AS/RS systems continue to evolve, offering faster throughput and higher density storage than ever before.

### Integration with Racking Systems
Modern racking is being designed with automation in mind. Rack structures must accommodate robotic access patterns, sensor mounting points, and precise dimensional tolerances.

## What This Means for Your Racking

If you're planning a new warehouse or renovating an existing one, it's crucial to consider future automation compatibility in your racking design. This includes:

- Consistent beam heights and spacing
- Higher dimensional accuracy in installation
- Provisions for guide rails and sensors
- Structural capacity for automated equipment loads

At Flint Racks, we design with the future in mind. Our engineering team can help you plan a racking system that's ready for automation when you are.`,
    author: 'Thomas Edwards',
    authorRole: 'COO',
    date: '2025-09-05',
    status: 'draft',
  },
];

function getStoredPosts(): BlogPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BlogPost[];
      const migrated = parsed.map((post) => {
        if (post.id === '1') return { ...post, coverImage: '/assets/blog-cover-1.webp' };
        if (post.id === '2') return { ...post, coverImage: '/assets/blog-cover-2.webp' };
        if (post.id === '3') return { ...post, coverImage: '/assets/blog-cover-3.webp' };
        return post;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch {
    // fallback to defaults
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
}

function savePosts(posts: BlogPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export function getAllPosts(): BlogPost[] {
  return getStoredPosts();
}

export function getPublishedPosts(): BlogPost[] {
  return getStoredPosts().filter(p => p.status === 'published');
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getStoredPosts().find(p => p.slug === slug);
}

export function createPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const posts = getStoredPosts();
  const newPost: BlogPost = { ...post, id: Date.now().toString() };
  posts.unshift(newPost);
  savePosts(posts);
  return newPost;
}

export function updatePost(id: string, updates: Partial<BlogPost>): BlogPost | undefined {
  const posts = getStoredPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return undefined;
  posts[index] = { ...posts[index], ...updates };
  savePosts(posts);
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getStoredPosts();
  const filtered = posts.filter(p => p.id !== id);
  if (filtered.length === posts.length) return false;
  savePosts(filtered);
  return true;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export { slugify };
