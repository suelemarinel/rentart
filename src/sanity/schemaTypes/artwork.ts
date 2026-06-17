import { defineField, defineType } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Œuvre',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artiste',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Peinture', value: 'peinture' },
          { title: 'Sculpture', value: 'sculpture' },
          { title: 'Photographie', value: 'photographie' },
          { title: 'Dessin', value: 'dessin' },
          { title: 'Tirage', value: 'tirage' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'Ex: 140 × 180 cm',
    }),
    defineField({
      name: 'price',
      title: 'Prix / mois (€)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'available',
      title: 'Disponible',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})